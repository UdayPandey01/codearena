import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { SubmitProblemDto } from "./dto/submit-problem.dto";
import { KafkaProducerService } from "src/kafka/kafka-producer.service";

@Injectable()
export class SubmissionService {
  constructor(
    private prisma: PrismaService,
    private kafkaProducer: KafkaProducerService
  ) {}

  async submit(submitProblemDto: SubmitProblemDto, userId: string) {
    const submission = await this.prisma.submission.create({
      data: {
        ...submitProblemDto,
        userId: userId,
        status: "Queued"
      },
      select : {
        id : true,
        sourceCode : true,
        languageId : true,
        problemId : true,
        roomId : true,
      }
    });


    await this.kafkaProducer.produce("submission-created", {
      submissionId: submission.id,
      sourceCode: submission.sourceCode,
      languageId: submission.languageId,
      problemId: submission.problemId,
      roomId : submission.roomId
    });

    return {
      submissionId: submission.id,
      message: "Your submission has been queued and is being processed.",
    };
  }
}