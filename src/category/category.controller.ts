import { Controller, Get, Req, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Request} from "express";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Req() req: Request) {

    let options = {};

        if (req.query.keyword) {
            options = {
                $or: [
                    {category: new RegExp(req.query.keyword.toString(), 'i')},
                    // {description: new RegExp(req.query.s.toString(), 'i')},
                ]
            }
        }

        const query = this.categoryService.findAll(options).sort({category: 1})

        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 10;
        const total = await this.categoryService.count(options);

        const data = await query.skip((page - 1) * limit).limit(limit).exec();

        return {
          data,
          total,
          page,
          last_page: Math.ceil(total / limit)
      };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
