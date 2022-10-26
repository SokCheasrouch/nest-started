import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}
  async create(createUserDto: CreateUserDto){
    console.log(createUserDto)
    // const createUser = new this.userModel(createUserDto);
    const createPost =  await this.userModel.create({ ...createUserDto });
    console.log(createPost);
    return createPost;
  }

  findAll() {
    return this.userModel.find({userName: "Joe"}).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
