import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CrawlService } from './crawl/crawl.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private scrapService: CrawlService) {}

  @Get()
  getHello(): string{
    return this.appService.getHello();
  }

  @Get('/rahayu')
  getRahayu(): Promise<any>{
    return this.scrapService.scrapWebSource()
  }
}
