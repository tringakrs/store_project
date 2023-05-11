import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import UpdateCategoryDto from './dtos/update-category.dto';
import CreateCategoryDto from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(@Body() category: CreateCategoryDto) {
    this.categoryService.create(category);
  }

  @Get()
  getAllCategories() {
    return this.categoryService.findAll();
  }

  //   async getCategoryById(id: number) {
  //     const category = await this.categoriesRepository.findOne({
  //       where: { id },
  //       relations: ['posts'],
  //     });
  //     if (category) {
  //       return category;
  //     }
  //     throw new CategoryNotFoundException(id);
  //   }

  @Get('/:id')
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }

  //   async updateCategory(id: number, category: UpdateCategoryDto) {
  //     await this.categoriesRepository.update(id, category);
  //     const updatedCategory = await this.categoriesRepository.findOne({
  //       where: { id },
  //       relations: ['posts'],
  //     })
  //     if (updatedCategory) {
  //       return updatedCategory;
  //     }
  //     throw new CategoryNotFoundException(id);
  //   }

  @Put('/:id')
  updateCategory(@Param('id') id: number, @Body() category: UpdateCategoryDto) {
    return this.categoryService.update(id, category);
  }
}
