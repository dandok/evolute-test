import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class SurveyResponseDto {
  @IsArray()
  @IsNotEmpty()
  response!: BaseDto[];
}

class BaseDto {
  @IsString()
  @IsNotEmpty()
  question_id!: string;

  @IsString()
  @IsOptional()
  users_free_text?: string;

  @IsArray()
  @IsOptional()
  selected_options?: ObjectId[];
}
