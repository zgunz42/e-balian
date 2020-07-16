import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Module({
  providers: [CrawlService],
  exports: [CrawlService],
})
export class CrawlModule {}
