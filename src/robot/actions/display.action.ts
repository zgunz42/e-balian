import { Action } from "../interfaces/action.interface";
import { Injectable, Inject, Scope } from '@nestjs/common';
import RiveScript from "rivescript";
import { CrawlService } from "src/crawl/crawl.service";
import { RobotService } from "../robot.service";

@Injectable()
export class DisplayAction implements Action {
    
    constructor(@Inject(CrawlService) private crawlServ: CrawlService){}

    async handle(rs: RiveScript, args: string[]): Promise<string> {
        const  data = await this.crawlServ.scrapWebSource();
        const baik = data.rahayun.filter(e => e.baik).map(c => `(${c.name}) [baik]: ${c.baik}`)
        return `${data.date.toUTCString()} = ${baik.join(',')}`;
    }
}