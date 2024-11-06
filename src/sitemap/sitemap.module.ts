import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { BlogModule } from '../blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { BlogService } from '../blog/blog.service';

@Module({
  imports: [BlogModule, ConfigModule],
  controllers: [SitemapController],
  providers: [BlogService]
})
export class SitemapModule {}
