import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TransactionController],
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  providers: [TransactionService]
})
export class TransactionModule {}
