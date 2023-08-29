import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word{
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hint: string;

  @Prop({ required: true })
  difficulty: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);