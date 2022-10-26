
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;


@Schema()
export class Customer {
    @Prop({required: [true, "Customer id is required"]})
    customer_id: string;

    @Prop({required: [true, "Customer name is required"]})
    name: string;

    @Prop({required: [true, "Customer date is required"]})
    created: Date;

    @Prop({required: [true, "Customer mobile number is required"]})
    mobile_number: string;

    @Prop({required: [true, "Customer gener is required"]})
    gender: string;

    @Prop({required: [true, "Customer age is required"]})
    age: Date;

    @Prop()
    occuation: string;

    @Prop()
    province: string;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

