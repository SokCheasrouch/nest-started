import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionDocument } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
    ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return this.transactionModel.aggregate([
      // First Stage
      {
        $match : { "created": { $gte: new Date("2022-08-01"), $lt: new Date("2022-12-30") } }
      },
      // Second Stage
      {
        $group : {
           _id : { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
           issue_points: { $sum: "$issue_points" },
           redeem_points: { $sum: "$redeem_points" },
           expire_points: { $sum: "$expire_points" },
           count: { $sum: 1 }
        }
      },
      // Third Stage
      {
        $sort : { _id: 1 }
      }
     ])
  }

  findOne(id: number) {
    return this.transactionModel.aggregate([
      // First Stage
      {
        $match : { "created": { $gte: new Date("2022-08-01"), $lt: new Date("2022-12-30") } }
      },
      // Second Stage
      {
        $group : {
           _id : { $dateToString: { format: "%Y-%m", date: "$created" } },
           issue_points: { $sum: "$issue_points" },
           min_date: { $min: "$created" },
           max_date: { $max: "$created" },
           issue_value: { $sum: { $multiply: [ "$issue_points", 0.004 ] } },
           redeem_points: { $sum: "$redeem_points" },
           expire_points: { $sum: "$expire_points" },
           count: { $sum: 1 }
        }
      },
      // Third Stage
      {
        $sort : { _id: 1 }
      }
     ])
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
