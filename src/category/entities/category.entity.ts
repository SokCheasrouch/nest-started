import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;


export class Category {
    @prop({required: [true, "category name is required"]})
    category:string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

