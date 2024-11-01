import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get('list')
    async getAll(@Query() query: any) {
        const categories = await this.categoryService.getAll();

        return { data: categories };
    }

    @Post('create')
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const newCategory = await this.categoryService.create(createCategoryDto);

        return { data: newCategory };
    }

    @Post('update')
    async update(@Body() updateCategoryDto: UpdateCategoryDto) {
        const newCategory = await this.categoryService.update(updateCategoryDto);

        return { data: newCategory };
    }

    @Post('delete')
    async delete(@Body() deleteCategoryDto: DeleteCategoryDto) {
        const deletedCategory = await this.categoryService.delete(deleteCategoryDto);

        return { data: !!deletedCategory };
    }
}
