import { Module } from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Module({
  imports: [],
  exports: [CrawlService],
  providers: [CrawlService],
})
export class CrawlModule {}