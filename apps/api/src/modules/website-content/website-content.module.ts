import { Module } from '@nestjs/common';
import { WebsiteContentService } from './website-content.service';
import { WebsiteContentController } from './website-content.controller';

@Module({
  controllers: [WebsiteContentController],
  providers: [WebsiteContentService],
})
export class WebsiteContentModule {}
