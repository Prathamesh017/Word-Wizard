import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }


  public async createUser(userId: string, email: string): Promise<User> {
    try {
      const createdUser = new this.userModel({ userId, email });
      return createdUser.save();


    } catch (error) {
      throw new BadRequestException()
    }
  }
  public async loginUser(userId: string, email: string): Promise<User> {
    try {
      let user = await this.userModel.find({ userId, });
      if (!user || user.length == 0) {
        return this.createUser(userId, email);
      }


      return {
        userId: user[0].userId,
        email: user[0].email,
        highscore: user[0].highscore

      }




    } catch (error) {
      throw new BadRequestException()
    }
  }
  public async updateHighScore(userId: string, highscore: number): Promise<User> {
    try {
      let user = await this.userModel.find({ userId });
      return await this.userModel.findByIdAndUpdate(user[0]._id, { highscore })






    } catch (error) {
      throw new BadRequestException()
    }
  }
}

