import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, CustomerDocument, CustomerSchema } from './entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const csv = require('fast-csv');
const fs = require("fs");

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
    ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll(options) {
    return this.customerModel.find(options);
  }

  count(options) {
    return this.customerModel.count(options).exec();
  }


  async downloadCsv() {
    const csvStream = csv.format({ headers: true });
    const writeStream = fs.createWriteStream('./download.csv');
    csvStream.pipe(writeStream).on('end',() => {
      console.log("DONE");
    }).on('error',err => console.error(err));

    let done = false;
    let i = 0, j = 0;
    const limit = 20000;
    while (!done) {
      const ski = limit * i;
      const customer = await this.customerModel.find({}, {}, { skip: ski, limit: limit });
      if (customer.length == 0) {
        done = true;
      } else {
        i++;
        console.log("==>> i ===>> ", i)
        console.log(customer.length);
        customer.forEach((c) => {
          let o: any = {};
          o.id = c._id.toString();
          o.name = c.name;
          o.gener = c.gender;
          j++;
          csvStream.write(o);
        }
        )
      }
    }

    console.log('done', j)
    csvStream.end();
    writeStream.end();

  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
