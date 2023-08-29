import { Body, Controller, Get, Post } from '@nestjs/common';
import { wordDto } from './dtos/word.dto';
import { WordService } from './word.service';
import { Response } from 'src/types/type.interface';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {

  }

  @Post()
  public async addWord(@Body() word: wordDto): Promise<Response> {
    try {
      const { name, hint, difficulty } = word;
      const createdword = await this.wordService.addAWord(name, hint, difficulty)

      const response: Response = {
        message: "Word Created Successfully",
        data: {
          word: createdword,
        }
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  public async getWords(): Promise<Response> {
    try {

      const allWords = await this.wordService.getAllWords()
      const response: Response = {
        message: "Word Created Successfully",
        data: {
          word: allWords,
        }
      }
      return response;
    } catch (error) {

      console.log(error);
    }
  }
}
