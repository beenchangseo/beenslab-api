import { Controller, Get, Query, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { GetBlogPostRequestDto, GetBlogVisitCounterRequestDto } from './dto/blog.request.dto';
import { GetAllBlogPostResponseDto, GetBlogPostResponseDto } from './dto/blog.response.dto';
import { Response } from 'express';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get('post/list')
    async getAll(): Promise<{ data: GetAllBlogPostResponseDto[] }> {
        const posts = await this.blogService.getAll();

        return { data: posts };
    }

    @Get('post')
    async getBlogPost(@Query() params: GetBlogPostRequestDto): Promise<{ data: GetBlogPostResponseDto }> {
        const post = await this.blogService.getBlogPost(params);

        return { data: post };
    }

    @Get('count')
    async getVisitCounter(@Query() params: GetBlogVisitCounterRequestDto, @Res() response: Response) {
        const svg = await this.blogService.getBlogVisitCounterHtml(params);

        response.setHeader('Content-Type', 'image/svg+xml');
        response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');

        return response.status(200).send(svg);
    }
}
