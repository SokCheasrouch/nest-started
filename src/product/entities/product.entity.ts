import { Transform, Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({required: [true, "Product title is required"]})
    title: string;

    @Prop({required: [true, "Product price is required"]})
    price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    @Type(() => Category)
    category: Category;

}
export const ProductSchema = SchemaFactory.createForClass(Product);
