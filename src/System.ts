import { System as SSystem } from '@lastolivegames/becsy';
import { Commands } from './commands/Commands';

export enum SystemType {
  /**
   * Startup is where you typically add systems that should run only once on app startup.
   */
  STARTUP,
  /**
   * Update is the schedule where you typically add any systems you want to run every frame.
   */
  UPDATE,
}

type QueryBuilder = any;
/**
 * Systems are pieces of functionality.
 * @see https://bevy-cheatbook.github.io/programming/systems.html
 * Communicate with other systems by events emitter.
 * @see https://bevy-cheatbook.github.io/programming/events.html
 * System Order of Execution
 * @see https://bevy-cheatbook.github.io/programming/system-order.html
 * @see https://bevy-cheatbook.github.io/programming/exclusive.html
 */
export type System = {
  (commands: Commands, system: SSystem): void;
  queries?: Record<string, (q: QueryBuilder) => void>;
};
