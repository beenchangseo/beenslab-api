import { Controller, Get, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { GetBlogPostRequestDto } from './dto/blog.request.dto';
import { GetAllBlogPostResponseDto, GetBlogPostResponseDto } from './dto/blog.response.dto';

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

        console.log(`controller post, ${post}`);

        return { data: post };
    }
}
