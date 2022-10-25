import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule, 
    ChatModule,
    MongooseModule.forRoot('mongodb+srv://shopping:cheasrouch123@shopping.xuzzg.mongodb.net/?retryWrites=true&w=majority'),
    CategoryModule
  ],
})
export class AppModule {}
