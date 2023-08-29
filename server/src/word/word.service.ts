import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from 'src/schemas/word.schema';

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) { }

  public async addAWord(name: string, hint: string, difficulty: string): Promise<Word> {
    try {
      const createdWord = new this.wordModel({ name, hint, difficulty });
      return createdWord.save();


    } catch (error) {
      throw new BadRequestException()
    }
  }

  public async getAllWords(): Promise<Word[]> {
    try {
      const allWords = await this.wordModel.find({});
      return allWords


    } catch (error) {
      throw new BadRequestException()
    }
  }
}
