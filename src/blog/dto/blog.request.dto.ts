import { IsString } from 'class-validator';

export class GetBlogPostRequestDto {
    @IsString()
    id: string;
}
