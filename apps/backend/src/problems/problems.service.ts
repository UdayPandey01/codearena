import { Injectable } from '@nestjs/common';
c
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProblemDto) {
    return this.prisma.problem.create({ data });
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
