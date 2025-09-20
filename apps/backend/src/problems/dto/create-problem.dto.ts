import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  difficulty: string;

  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  constraints?: string;

  @IsNotEmpty()
  examples: any;   // JSON

  @IsNotEmpty()
  testCases: any;  // JSON
}
