import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type CatDocument = Chat & Document;
export class Chat {

    @prop({required: [true, "Message is required"]})
    message:string;

    @prop({required: [true, "Sender is required"]})
    senders:string;

    @prop({required: [true, "Recipient is required"]})
    recipient:string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
