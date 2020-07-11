import { Action } from "../interfaces/action.interface";
import RiveScript from "rivescript";

export class DisplayAction implements Action {
    handle(rs: RiveScript, args: string[]): Promise<string> {
        return Promise.resolve('asana');
    }

}