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

@Controller('products') // Define the base path for the controller
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create a new category
  @Post('categories')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    return await this.productsService.createCategory(createCategoryDto.name);
  }

  // Create a new product within a category
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

  // Get all categories (you can add functionality for filtering, sorting, etc.)
  @Get('categories')
  async findAllCategories(): Promise<any> {
    return await this.productsService.findAllCategories(); // Implement logic in service
  }

  // Get all products within a specific category (you can add pagination, etc.)
  @Get('categories/:categoryId/products')
  async findProductsByCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<any> {
    return await this.productsService.findProductsByCategory(categoryId); // Implement logic in service
  }

  // Get a single product by ID (you can add error handling for non-existent products)
  @Get(':id')
  async findProductById(@Param('id') id: number): Promise<any> {
    return await this.productsService.findProductById(id); // Implement logic in service
  }

  // Delete a category (you can add error handling for non-existent categories)
  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: number): Promise<any> {
    return await this.productsService.deleteCategory(id); // Implement logic in service
  }

  // Delete a product (you can add error handling for non-existent products)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    return await this.productsService.deleteProduct(id); // Implement logic in service
  }

  // Update a category (you can add validation for updated data)
  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: any, // Define a DTO for updated data
  ): Promise<any> {
    return await this.productsService.updateCategory(id, updateCategoryDto); // Implement logic in service
  }

  // Update a product (you can add validation for updated data)
  // @Put('products/:id')
  // async updateProduct(
  //   @Param('id') id: number,
  //   @Body() updateProductDto: any,
  // ): Promise<any> {
  //   return await this.productsService.updateProduct(updateProductDto); // Implement logic in service
  // }
}
