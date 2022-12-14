import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule, 
    ChatModule,
    MongooseModule.forRoot('mongodb+srv://shopping:cheasrouch123@shopping.xuzzg.mongodb.net/?retryWrites=true&w=majority'),
    CategoryModule,
    CustomerModule,
    ProductModule,
    TransactionModule
  ],
})
export class AppModule {}

// customers pagination , search, group male | female
// download csv
// join product and category
// report transaction
