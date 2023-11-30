import {
  system,
  System as SSystem,
  SystemType as SSystemType,
  World,
} from '@lastolivegames/becsy';
import { Plugin } from './Plugin';
import { AppConfig, IAppConfig } from './components';
import { System, SystemType } from './System';
import { Commands } from './commands/Commands';

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
  private systems: Record<SystemType, System[]> = {
    [SystemType.STARTUP]: [],
    [SystemType.UPDATE]: [],
  };
  private systemsInternal: SSystemType<any>[] = [];

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
   *   .addSystems(SystemType.STARTUP, s1, s2);
   */
  addSystems(type: SystemType, ...systems: System[]) {
    this.systems[type].push(...systems);
    return this;
  }

  addSystemsInternal(...systems: SSystemType<any>[]) {
    this.systemsInternal.push(...systems);
    return this;
  }

  /**
   * Start the app and run all systems.
   */
  async run() {
    const config = this.config;

    // Create a global init system.
    class Init extends SSystem {
      config = this.singleton.write(AppConfig);
      initialize(): void {
        this.config.canvas = config.canvas;
      }
    }
    system(Init);

    // Build all plugins.
    await Promise.all(this.plugins.map((plugin) => plugin.build(this)));

    this.systemsInternal.forEach((s) => system(s));

    // Build all systems.
    this.buildSystems(SystemType.STARTUP);
    this.buildSystems(SystemType.UPDATE);

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

  private buildSystems(type: SystemType) {
    this.systems[type].forEach((s) => {
      class S extends SSystem {
        private commands = new Commands(this);

        constructor() {
          super();
          Object.keys(s.queries).forEach((key) => {
            this[key] = this.query(s.queries[key]);
          });
        }

        initialize(): void {
          if (type === SystemType.STARTUP) {
            s(this.commands, this);
            this.commands.execute();
          }
        }
        execute(): void {
          if (type === SystemType.UPDATE) {
            s(this.commands, this);
            this.commands.execute();
          }
        }
      }

      // Avoid duplicated system name.
      Object.defineProperty(S, 'name', { value: Math.random().toString(36) });
      system(S);
    });
  }

  /**
   * Exit the app.
   * @see https://bevy-cheatbook.github.io/programming/app-builder.html#quitting-the-app
   */
  exit() {
    this.world.terminate();
  }
}
