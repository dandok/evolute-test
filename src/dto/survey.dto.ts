import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EQuestionType } from '../Models/Survey/schema';

class OptionDto {
  @IsString()
  @IsNotEmpty()
  description: string | undefined;
}

class QuestionDto {
  @IsEnum(EQuestionType)
  question_type: EQuestionType | undefined;

  @IsString()
  @IsNotEmpty()
  description: string | undefined;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[] | undefined;
}

export class SurveyDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[] | undefined;

  @IsArray()
  @IsNotEmpty()
  participants: string[] | undefined;
}
