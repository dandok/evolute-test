import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { questions } from '../@types/survey';
import { ObjectId } from 'mongodb';

export class SurveyInputDto {
  @IsArray()
  @IsNotEmpty()
  questions!: questions;

  @IsArray()
  @IsOptional()
  participants?: ObjectId;
}
