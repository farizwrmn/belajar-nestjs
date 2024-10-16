import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('categories')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    return await this.productsService.createCategory(createCategoryDto.name);
  }

  @Post(':categoryId')
  async createProduct(
    @Param('categoryId') categoryId: number,
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {
    return await this.productsService.createProduct(
      createProductDto.name,
      createProductDto.price,
      categoryId,
    );
  }

  @Get('categories')
  async findAllCategories(): Promise<any> {
    return await this.productsService.findAllCategories();
  }

  @Get('categories/:categoryId/products')
  async findProductsByCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<any> {
    return await this.productsService.findProductsByCategory(categoryId);
  }

  @Get(':id')
  async findProductById(@Param('id') id: number): Promise<any> {
    return await this.productsService.findProductById(id);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: number): Promise<any> {
    return await this.productsService.deleteCategory(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    return await this.productsService.deleteProduct(id);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: any,
  ): Promise<any> {
    return await this.productsService.updateCategory(id, updateCategoryDto);
  }

  // @Put('products/:id')
  // async updateProduct(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: any,
  // ): Promise<any> {
  //   return await this.productsService.updateProduct(updateProductDto);
  // }
}
