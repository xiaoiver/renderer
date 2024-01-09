import {
  system,
  System,
  SystemType,
  World,
  SystemGroup,
} from '@lastolivegames/becsy';
import { PluginType } from './Plugin';
import { AppConfig, IAppConfig } from './components';
import {
  First,
  Last,
  PostStartup,
  PostUpdate,
  PreStartUp,
  PreUpdate,
  StartUp,
  Update,
} from './systems';
import { EventCtor, Events, EventsReader } from './Events';
import { Resource } from './Resource';
import { caf, raf } from './utils';

/**
 * @see https://bevy-cheatbook.github.io/programming/app-builder.html
 */
export class App {
  /**
   * The main ECS [`World`] of the [`App`].
   * This stores and provides access to all the main data of the application.
   * The systems of the [`App`] will run using this [`World`].
   */
  world: World;

  /**
   * All the plugins registered.
   */
  private plugins: PluginType[] = [];

  /**
   * All the systems registered.
   */
  private readonly systems: [SystemGroup, SystemType<any>][] = [];

  private updateEventsSystemCounter = 0;
  private resources = new WeakMap<any, Resource>();
  private rafId: number;

  constructor(private config?: Partial<IAppConfig>) {}

  /**
   * @example
   * new App()
   *   .add_plugin(P1)
   */
  add_plugin(plugin: PluginType) {
    this.plugins.push(plugin);
    return this;
  }

  /**
   * @example
   * new App()
   *   .add_plugins(P1, P2)
   */
  add_plugins(...plugins: PluginType[]) {
    plugins.forEach((plugin) => {
      this.add_plugin(plugin);
    });
    return this;
  }

  /**
   * Setup the application to manage events of type `T`.
   *
   * This is done by adding a [`Resource`] of type [`Events::<T>`],
   * and inserting an [`event_update_system`] into [`First`].
   *
   * See [`Events`] for defining events.
   *
   * @example
   * app.add_event(MyEvent);
   */
  add_event<E>(eventCtor: EventCtor<E>) {
    const events = new Events<E>();
    const reader = new EventsReader(events, events.get_reader());
    this.init_resource(eventCtor, reader);

    class UpdateEvents extends System {
      execute(): void {
        if (
          events.events_a.events.length !== 0 ||
          events.events_b.events.length !== 0
        ) {
          events.update();
        }
      }
    }
    Object.defineProperty(UpdateEvents, 'name', {
      value: `_UpdateEventsSystem${this.updateEventsSystemCounter++}`,
    });

    this.add_systems(First, UpdateEvents);
    return this;
  }

  /**
   * Adds a system to the given schedule in this app's [`Schedules`].
   * @example
   * new App()
   *   .add_systems(StartUp, S1, S2);
   */
  add_systems(group: SystemGroup, ...systems: SystemType<any>[]) {
    this.systems.push(
      ...systems.map((s) => [group, s] as [SystemGroup, SystemType<any>]),
    );
    return this;
  }

  /**
   * Initialize a [`Resource`] with standard starting values by adding it to the [`World`].
   */
  init_resource<K, R extends Resource>(key: K, resource: R) {
    this.resources.set(key, resource);
    return this;
  }

  get_resource<K, R extends Resource>(key: K): R {
    return this.resources.get(key) as R;
  }

  /**
   * Start the app and run all systems.
   */
  async run() {
    const config = this.config;
    const resources = this.resources;

    // Create a global init system.
    @system(PreStartUp)
    class Init extends System {
      config = this.singleton.write(AppConfig);
      initialize(): void {
        this.config.canvas = config.canvas;
        this.config.shaderCompilerPath = config.shaderCompilerPath;
        this.config.resources = resources;
      }
    }

    @system(PreStartUp)
    class PreStartUpPlaceHolder extends System {}
    @system(StartUp)
    class StartUpPlaceHolder extends System {}
    @system(PostStartup)
    class PostStartUpPlaceHolder extends System {}
    @system(PreUpdate)
    class PreUpdatePlaceHolder extends System {}
    @system(Update)
    class UpdatePlaceHolder extends System {}
    @system(PostUpdate)
    class PostUpdatePlaceHolder extends System {}
    @system(First)
    class FirstPlaceHolder extends System {}
    @system(Last)
    class LastPlaceHolder extends System {}

    // Build all plugins.
    await Promise.all(this.plugins.map((plugin) => new plugin().build(this)));

    this.systems.forEach(([group, s], i) => {
      // @see https://github.com/LastOliveGames/becsy/blob/main/tests/query.test.ts#L22C3-L22C58
      // @ts-ignore
      // if (import.meta.env.PROD) {
      // Object.defineProperty(s, 'name', { value: `_System${i}` });
      // }
      system(group)(s);
    });

    // Create world.
    // All systems will be instantiated and initialized before the returned promise resolves.
    this.world = await World.create({
      // Multithreading is not supported yet.
      threads: 1,
    });

    const requestAnimationFrame = raf;
    const tick = async () => {
      await this.world.execute();
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);

    return this;
  }

  /**
   * Exit the app.
   * @see https://bevy-cheatbook.github.io/programming/app-builder.html#quitting-the-app
   */
  async exit() {
    const cancelAnimationFrame = caf;
    cancelAnimationFrame(this.rafId);
    await this.world.terminate();
  }
}
