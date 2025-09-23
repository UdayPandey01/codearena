import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class SubmitProblemDto {
  @IsString()
  @IsNotEmpty()
  sourceCode: string;

  @IsNumber()
  @IsNotEmpty()
  languageId: number;

  @IsUUID()
  @IsNotEmpty()
  problemId: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;
}