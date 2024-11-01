import { IsString } from 'class-validator';

export class GetBlogPostRequestDto {
    @IsString()
    title: string;
}
