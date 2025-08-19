import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetBlogPostRequestDto, GetBlogVisitCounterRequestDto } from './dto/blog.request.dto';
import { GetAllBlogPostResponseDto, GetBlogPostResponseDto } from './dto/blog.response.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BlogService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly firebaseService: FirebaseService,
    ) {}

    async getAll(): Promise<GetAllBlogPostResponseDto[]> {
        const blogs = await this.prismaService.post.findMany({
            orderBy: { create_time: 'desc' },
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
                slug: blog.slug,
                title: blog.title,
                description: blog.description,
                categories: blog.PostOnCategory.map((item) => item.category.keyword),
                update_time: blog.update_time,
                create_time: blog.create_time,
            };
        });

        return getAllBlogPostResponseDtos;
    }

    async getBlogPost(getBlogPostRequestDto: GetBlogPostRequestDto): Promise<GetBlogPostResponseDto> {
        const blog = await this.prismaService.post.findFirst({
            where: { slug: getBlogPostRequestDto.slug },
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
            slug: blog.slug,
            title: blog.title,
            description: blog.description,
            tags: blog.tags,
            categories: blog.PostOnCategory.map((item) => item.category.keyword),
            contents: blog.contents,
            update_time: blog.update_time,
            create_time: blog.create_time,
        };

        return getBlogPostResponseDto;
    }

    async getBlogVisitCounterHtml(params: GetBlogVisitCounterRequestDto): Promise<string> {
        const postId = params.post_id;
        const domain = params.domain;
        const html = await this.firebaseService.getBlogVisitCounterHtml(postId, domain);

        return html;
    }
}
