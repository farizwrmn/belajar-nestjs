import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { response } from 'src/utils/respons.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = new Category();
    category.name = name;
    return await this.categoryRepository.save(category);
  }

  async createProduct(
    name: string,
    price: number,
    categoryId: number,
  ): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    return await this.productRepository.save(product);
  }

  async findAllCategories() {
    const result = await this.categoryRepository.find();
    return response(true, 'Data fetched!', result);
  }

  async findProductsByCategory(categoryId: number) {
    const result = await this.productRepository.find({
      where: { category: { id: categoryId } },
    });
    return response(true, 'Data fetched!', result);
  }

  async findProductById(id: number) {
    const result = await this.productRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(response(false, 'Data not found!', null));
    }
    return response(true, 'Data fetched!', result);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(response(false, 'Category not found!', null));
    }
    const result = await this.categoryRepository.remove(category);
    return response(true, 'Category deleted!', result);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(response(false, 'Product not found!', null));
    }
    const result = await this.productRepository.remove(product);
    return response(true, 'Product deleted!', result);
  }

  async updateCategory(id: number, name: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(response(false, 'Category not found!', null));
    }
    category.name = name;
    const result = await this.categoryRepository.save(category);
    return response(true, 'Category updated!', result);
  }
  // async updateProduct(id: number, name: string, price: number) {
  //   const product = await this.productRepository.findOneBy({ id });
  //   if (!product) {
  //     throw new NotFoundException(response(false, 'Product not found!', null));
  //   }
  //   product.name = name;
  //   product.price = price;
  //   const result = await this.productRepository.save(product);
  //   return response(true, 'Product updated!', result);
  // }
}
