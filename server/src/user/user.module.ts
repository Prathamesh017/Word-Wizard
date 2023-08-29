import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user.schema';
import { WordModule } from 'src/word/word.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),WordModule],
  providers: [UserService],
  controllers: [UserController]

})
export class UserModule { 
  
}
