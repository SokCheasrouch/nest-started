import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type CatDocument = User & Document;
export class User {
    @prop({required: [true, "User name is required"]})
    userName:string;

    @prop({required: [true, "Phone is required"]})
    phone:string;
}

export const ChatSchema = SchemaFactory.createForClass(User);

