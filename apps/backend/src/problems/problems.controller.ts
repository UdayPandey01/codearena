import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProblemService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post()
  create(@Body() dto: CreateProblemDto) {
    return this.problemService.create(dto);
  }

  @Get()
  findAll() {
    return this.problemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProblemDto) {
    return this.problemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemService.remove(id);
  }
}
