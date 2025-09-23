import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProblemDto) {
    const problem_create = await this.prisma.problem.create({
      data
    })
    return problem_create;
  }

  findAll() {
    return this.prisma.problem.findMany();
  }

  findOne(id: string) {
    return this.prisma.problem.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateProblemDto) {
    return this.prisma.problem.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.problem.delete({ where: { id } });
  }
}
