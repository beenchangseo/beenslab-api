import { IsString } from 'class-validator';

export class GetBlogPostRequestDto {
    @IsString()
    slug: string;
}

export class GetBlogVisitCounterRequestDto {
    @IsString()
    post_id: string;

    @IsString()
    domain: string;
}
