import RiveScript from 'rivescript';

export interface Action {
  handle(rs: RiveScript, args: string[]): string | Promise<string>;
}
