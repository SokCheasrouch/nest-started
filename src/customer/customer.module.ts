import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CustomerController],
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema, collection: "customers" }])],
  providers: [CustomerService]
})
export class CustomerModule {}
