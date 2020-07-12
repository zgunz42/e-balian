import { Action } from "../interfaces/action.interface";
import RiveScript from "rivescript";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchAction implements Action {
    handle(rs: RiveScript, args: string[]): Promise<string> | string{
        return Promise.resolve('search action');
    }

}