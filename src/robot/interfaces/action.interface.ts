// import { Injectable, Inject } from '@nestjs/common';
import RiveScript from "rivescript";
// import { Robot } from '../robot';

export interface Action {
    handle(rs: RiveScript, args: string[]):  Promise<string>;
}

// @Injectable()
// export abstract class Action implements IAction {
//     constructor(@Inject('ROBOT') rs: Robot) {
//         this.handle(rs)
//     }

//     handle(rs: RiveScript, args: string[]): void {

//     }
    
//     doHandle(rs: RiveScript, args: string[]): void;
// }