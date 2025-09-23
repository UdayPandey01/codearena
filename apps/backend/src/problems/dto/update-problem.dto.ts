import { CreateProblemDto } from './create-problem.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProblemDto extends PartialType(CreateProblemDto) {}
    