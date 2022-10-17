import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, CatDocument } from './entities/chat.entity';

@Injectable()
export class ChatService {

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<CatDocument>
    ) {}

  async save(createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel(createChatDto);
    return await createdChat.save();
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
