import { Controller, Get, Header } from '@nestjs/common';
import { BlogService } from '../blog/blog.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class SitemapController {
    constructor(
        private readonly blogService: BlogService,
        private readonly configService: ConfigService,
    ) {}

    @Get('sitemap.xml')
    @Header('Content-Type', 'application/xml')
    async getSitemap(): Promise<string> {
        const posts = await this.blogService.getAll();

        return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${this.configService.get<string>('FRONTEND_SERVER_DOMAIN')}</loc>
                    <lastmod>2025-01-01T04:26:19.620Z</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>${this.configService.get<string>('FRONTEND_SERVER_DOMAIN')}/blog</loc>
                    <lastmod>2025-01-01T04:26:19.620Z</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>${this.configService.get<string>('FRONTEND_SERVER_DOMAIN')}/category</loc>
                    <lastmod>2025-01-01T04:26:19.620Z</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>${this.configService.get<string>('FRONTEND_SERVER_DOMAIN')}/career</loc>
                    <lastmod>2025-01-01T04:26:19.620Z</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
            ${posts
                .map(
                    (post) => `
                <url>
                    <loc>${this.configService.get<string>('FRONTEND_SERVER_DOMAIN')}/blog/post/${post.slug}</loc>
                    <lastmod>${new Date(post.update_time).toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>1.0</priority>
                </url>
                `,
                )
                .join('')}
            </urlset>
        `;
    }
}
