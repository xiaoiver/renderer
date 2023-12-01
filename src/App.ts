import {
  system,
  System,
  SystemType,
  World,
  SystemGroup,
} from '@lastolivegames/becsy';
import { Plugin } from './Plugin';
import { AppConfig, IAppConfig } from './components';
import {
  First,
  Last,
  PostStartup,
  PostUpdate,
  PreStartUp,
  PreUpdate,
  StartUp,
} from './systems';

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
  private plugins: Plugin[] = [];

  /**
   * All the systems registered.
   */
  private readonly systems: [SystemGroup, SystemType<any>][] = [];

  constructor(private config?: Partial<IAppConfig>) {}

  /**
   * @example
   * new App()
   *   .addPlugin(P1)
   */
  addPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
    return this;
  }

  /**
   * @example
   * new App()
   *   .addPlugins(P1, P2)
   */
  addPlugins(...plugins: Plugin[]) {
    plugins.forEach((plugin) => {
      this.addPlugin(plugin);
    });
    return this;
  }

  addEvent() {}

  /**
   * Adds a system to the given schedule in this app's [`Schedules`].
   * @example
   * new App()
   *   .addSystems(StartUp, S1, S2);
   */
  addSystems(group: SystemGroup, ...systems: SystemType<any>[]) {
    this.systems.push(
      ...systems.map((s) => [group, s] as [SystemGroup, SystemType<any>]),
    );
    return this;
  }

  /**
   * Start the app and run all systems.
   */
  async run() {
    const config = this.config;

    // Create a global init system.
    @system(PreStartUp)
    class Init extends System {
      config = this.singleton.write(AppConfig);
      initialize(): void {
        this.config.canvas = config.canvas;
      }
    }

    @system(StartUp)
    class StartUpPlaceHolder extends System {}
    @system(PostStartup)
    class PostStartUpPlaceHolder extends System {}
    @system(PreUpdate)
    class PreUpdatePlaceHolder extends System {}
    @system(PostUpdate)
    class PostUpdatePlaceHolder extends System {}
    @system(First)
    class FirstPlaceHolder extends System {}
    @system(Last)
    class LastPlaceHolder extends System {}

    // Build all plugins.
    await Promise.all(this.plugins.map((plugin) => plugin.build(this)));

    this.systems.forEach(([group, s]) => system(group)(s));

    // Create world.
    // All systems will be instantiated and initialized before the returned promise resolves.
    this.world = await World.create({
      // Multithreading is not supported yet.
      threads: 1,
    });

    const tick = async () => {
      await this.world.execute();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /**
   * Exit the app.
   * @see https://bevy-cheatbook.github.io/programming/app-builder.html#quitting-the-app
   */
  exit() {
    this.world.terminate();
  }
}
