import { IsArray, IsDate, IsString, IsUUID } from 'class-validator';

export class GetAllBlogPostResponseDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    categories: string[];

    @IsDate()
    update_time: Date;
}

export class GetBlogPostResponseDto {
    @IsUUID()
    user_id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    tags: string[];

    @IsArray()
    categories: string[];

    @IsString()
    contents: string;

    @IsDate()
    update_time: Date;
}
