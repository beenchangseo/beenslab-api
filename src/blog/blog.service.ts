import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetBlogPostRequestDto } from './dto/blog.request.dto';
import { GetAllBlogPostResponseDto, GetBlogPostResponseDto } from './dto/blog.response.dto';

@Injectable()
export class BlogService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(): Promise<GetAllBlogPostResponseDto[]> {
        const blogs = await this.prismaService.post.findMany({
            orderBy: { update_time: 'desc' },
            include: {
                PostOnCategory: {
                    include: {
                        category: {
                            select: {
                                keyword: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });

        const getAllBlogPostResponseDtos: GetAllBlogPostResponseDto[] = blogs.map((blog) => {
            return {
                id: blog.id,
                title: blog.title,
                description: blog.description,
                categories: blog.PostOnCategory.map((item) => item.category.keyword),
                update_time: blog.update_time,
            };
        });

        return getAllBlogPostResponseDtos;
    }

    async getBlogPost(getBlogPostRequestDto: GetBlogPostRequestDto): Promise<GetBlogPostResponseDto> {
        const blog = await this.prismaService.post.findFirst({
            where: { id: getBlogPostRequestDto.id },
            include: {
                PostOnCategory: {
                    include: {
                        category: {
                            select: {
                                keyword: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });

        if (!blog) {
            throw new NotFoundException('post not found');
        }

        const getBlogPostResponseDto: GetBlogPostResponseDto = {
            user_id: blog.user_id,
            title: blog.title,
            description: blog.description,
            tags: blog.tags,
            categories: blog.PostOnCategory.map((item) => item.category.keyword),
            contents: blog.contents,
            update_time: blog.update_time,
        };

        return getBlogPostResponseDto;
    }
}
