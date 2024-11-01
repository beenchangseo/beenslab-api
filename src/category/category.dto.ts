import { IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    keyword: string;

    @IsString()
    title: string;
}

export class UpdateCategoryDto {
    @IsUUID()
    id: string;

    @IsString()
    keyword: string;

    @IsString()
    title: string;
}

export class DeleteCategoryDto {
    @IsUUID()
    id: string;
}
