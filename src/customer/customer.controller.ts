import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {Request} from "express";

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(@Req() req: Request) {

    let options = {};


    if (req.query.keyword) {
      options = {
          $or: [
              {name: new RegExp(req.query.keyword.toString(), 'i')},
              {mobile_number: new RegExp(req.query.keyword.toString(), 'i')},
              {province: new RegExp(req.query.keyword.toString(), 'i')},
              {gender: new RegExp(req.query.keyword.toString(), 'i')},
              {occuation: new RegExp(req.query.keyword.toString(), 'i')},
          ]
      }
  }

  const query = this.customerService.findAll(options).sort({name: 1})

  const page: number = parseInt(req.query.page as any) || 1;
  const limit = 10;
  const total = await this.customerService.count(options);

  const data = await query.skip((page - 1) * limit).limit(limit).exec();

  return {
    data,
    total,
    page,
    last_page: Math.ceil(total / limit)
  };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
