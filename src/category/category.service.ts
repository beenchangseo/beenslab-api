import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { CreateCategoryDto, DeleteCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAll(): Promise<Category[]> {
        const categories = await this.prismaService.category.findMany();

        return categories;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const newCategory = await this.prismaService.category.create({
            data: { keyword: createCategoryDto.keyword, title: createCategoryDto.title },
        });

        return newCategory;
    }

    async update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        try {
            const updatedCategory = await this.prismaService.category.update({
                where: { id: updateCategoryDto.id },
                data: { keyword: updateCategoryDto.keyword, title: updateCategoryDto.title },
            });

            return updatedCategory;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('category not found');
                }
                if (error.code === 'P2002') {
                    throw new ConflictException('Unique constraint failed');
                }
            } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new InternalServerErrorException('An unknown error occurred');
            } else if (error instanceof Prisma.PrismaClientRustPanicError) {
                throw new InternalServerErrorException('A Rust panic occurred in Prisma engine');
            } else if (error instanceof Prisma.PrismaClientInitializationError) {
                throw new InternalServerErrorException('Prisma initialization error');
            } else if (error instanceof Prisma.PrismaClientValidationError) {
                throw new InternalServerErrorException('Validation error');
            } else {
                throw new InternalServerErrorException('Unexpected error');
            }
        }
    }

    async delete(deleteCategoryDto: DeleteCategoryDto): Promise<Category> {
        try {
            const deletedCategory = await this.prismaService.category.delete({ where: { id: deleteCategoryDto.id } });

            return deletedCategory;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('category not found');
                }
                if (error.code === 'P2002') {
                    throw new ConflictException('Unique constraint failed');
                }
            } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new InternalServerErrorException('An unknown error occurred');
            } else if (error instanceof Prisma.PrismaClientRustPanicError) {
                throw new InternalServerErrorException('A Rust panic occurred in Prisma engine');
            } else if (error instanceof Prisma.PrismaClientInitializationError) {
                throw new InternalServerErrorException('Prisma initialization error');
            } else if (error instanceof Prisma.PrismaClientValidationError) {
                throw new InternalServerErrorException('Validation error');
            } else {
                throw new InternalServerErrorException('Unexpected error');
            }
        }
    }
}
