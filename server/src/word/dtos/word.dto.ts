import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Difficulty } from "src/types/type.enum";

export class wordDto {

  @IsNotEmpty()
  @IsString()
  name: string;


  @IsNotEmpty()
  @IsString()
  hint: string;


  @IsNotEmpty()
  @IsString()
  @IsEnum(Difficulty)
  difficulty: Difficulty;

}

