import { Module } from '@nestjs/common';
import { ProblemService } from './problems.service';
import { ProblemController } from './problems.controller';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService],
})
export class ProblemModule {}
