import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule, 
    ChatModule,
    MongooseModule.forRoot('mongodb+srv://shopping:cheasrouch123@shopping.xuzzg.mongodb.net/?retryWrites=true&w=majority')
  ],
})
export class AppModule {}
