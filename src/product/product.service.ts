import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}

  create(createProductDto: CreateProductDto) {
    console.log('This action adds a new product');
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll() {
    return this.productModel.find().populate("category", "_id category");
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
