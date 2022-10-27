import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, StreamableFile ,Header } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {Request} from "express";
import * as fs from 'fs';
import * as path from 'path';
// import * as streamBuffers from 'stream-buffers';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { mongoose } from '@typegoose/typegoose';
import { UserSchema } from 'src/user/entities/user.entity';

// Connection URL
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://shopping:cheasrouch123@shopping.xuzzg.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'test';
const csv = require('fast-csv');

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('/csv')
  async getFile(@Res({ passthrough: true }) res: Response) {
    await client.connect();
    console.log("db connected");
    const db = client.db(dbName);


    // const file = createReadStream(join(process.cwd(), 'package.json'));
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });

    var User = mongoose.model('Users', UserSchema);

    const cursor = User.find();
    
    // const cursor = db.collection('categories').find();
    const filename = 'export.csv';
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });
    res.flushHeaders();

    var csvStream = csv.format({headers: true});
    cursor.cursor().pipe(csvStream).pipe(res);

    // return new StreamableFile(file);

    
    // return this.customerService.downloadCsv();
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
    // this.customerService.downloadCsv();
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
