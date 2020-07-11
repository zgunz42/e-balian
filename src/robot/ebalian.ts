import * as RiveScript from 'rivescript';
import * as path from 'path';

export abstract class BalianBot {
   rs: RiveScript.default;
    constructor() {
        this.rs = new (RiveScript as any)({
            utf8: true
        })
   }
   loadReply(onReady: () => void): void {
        const filePath = path.resolve("./src/robot/brains/balian.rive")
        this.rs.loadFile([
            filePath,
        ]).then(() => {
            this.rs.sortReplies();
            
            onReady();
            }).catch(function(err) {
                console.error(err);
            });
   }
   getReply(username: string, message: string): Promise<string> {
    // When we call RiveScript's getReply(), we pass `self` as the scope
    // variable which points back to this AsyncBot object. This way the
    // object macro can call `this.sendMessage()` to asynchronously send
    // a response to the user.
    return this.rs.reply(username, message, this);
    }
} 