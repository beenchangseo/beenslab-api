import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        BlogModule,
        CategoryModule,
        SitemapModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
