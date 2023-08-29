import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'src/types/type.interface';
import { FirebaseAuthenticationMiddleware } from 'src/middleware/firebase.middleware';
import { WordService } from 'src/word/word.service';


@UseGuards(FirebaseAuthenticationMiddleware)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly wordService: WordService) {

  }

  @Post("register")
  public async registerUser(@Req() req: Request, @Body() token: string): Promise<Response> {
    try {

      const { user_id: userId, email } = req["user"];
      const user = await this.userService.createUser(userId, email)

      const allWords = await this.wordService.getAllWords();
      const response: Response = {
        message: "User Register Successfull",
        data: {
          user,
          word: allWords
        }
      }
      return response
    } catch (error) {
      console.log(error);
    }
  }
  @Post("login")
  public async loginUser(@Req() req: Request, @Body() token: string): Promise<Response> {
    try {
      const { user_id: userId, email } = req["user"];
      const user = await this.userService.loginUser(userId, email)
      const allWords = await this.wordService.getAllWords();

      const response: Response = {
        message: "User Login Successfull",
        data: {
          user,
          word: allWords
        }

      }
      return response
    } catch (error) {
      console.log(error);
    }
  }
  @Put("update")
  public async updateUser(@Req() req: Request, @Body() data: any): Promise<Response> {
    try {
      const { user_id: userId } = req["user"];
      const user = await this.userService.updateHighScore(userId, data.score)

      const response: Response = {
        message: "User Login Successfull",
        data: {
          user,
        }

      }
      return response
    } catch (error) {
      console.log(error);
    }
  }
}
