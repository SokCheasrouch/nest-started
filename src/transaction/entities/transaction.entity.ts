import { Transform, Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop()
    create: Date;

    @Prop()
    issue_points: number;

    @Prop()
    redeem_points: number;

    @Prop()
    expire_points: number;

    @Prop()
    point_share: number;

    @Prop()
    manage_fee: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
