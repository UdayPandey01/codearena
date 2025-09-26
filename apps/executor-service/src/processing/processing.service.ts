import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { KafkaProducerService } from 'src/kafka/kafka-producer.service';
import { SubmissionJob, TestCase } from './types';
import axios from 'axios';

@Injectable()
export class ProcessingService {
  private readonly logger = new Logger(ProcessingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async processSubmission(job: SubmissionJob) {
    const submissionJob: SubmissionJob =
    typeof job === 'string' ? JSON.parse(job) : job;

    const { submissionId, sourceCode, languageId, problemId, roomId } = submissionJob;
    let finalVerdict = 'Error'; 

    try {
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'Processing' },
      });

      const problem = await this.prisma.problem.findUnique({
        where: { id: problemId },
      });

      if (!problem) {
        throw new Error(`Problem with ID ${problemId} not found.`);
      }

      const testCases = problem.testCases as TestCase[];
      finalVerdict = 'Accepted'; 

      if (!sourceCode) throw new Error('sourceCode is empty');
      if (!languageId) throw new Error('languageId is empty');
      if (!problemId) throw new Error('problemId is empty');

      for (const testCase of testCases) {
        this.logger.log(`Running test case for submission: ${submissionId}`);
        this.logger.log(`Judge) url ${process.env.JUDGE0_URL}`)

        const response = await axios.post(
          `${process.env.JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
          {
            source_code: sourceCode,
            language_id: Number(languageId),
            stdin: testCase.input || '',
            expected_output: testCase.output || '',
          },
        );

        const verdict = response.data?.status?.description || 'Error';

        if (verdict !== 'Accepted') {
          finalVerdict = verdict;
          this.logger.warn(`Test case failed for ${submissionId}: ${verdict}`);
          break; 
        }
      }

      await this.prisma.submission.update({
        where: { id: submissionId },
        data: { status: finalVerdict },
      });

      this.logger.log(`Submission ${submissionId} finished with status: ${finalVerdict}`);

    } catch (error) {
      finalVerdict = 'Processing Error';
      await this.prisma.submission.update({
        where: { id: submissionId },
        data: { status: finalVerdict },
      });
      this.logger.error(`Failed to process submission ${submissionId}`, error);

    } finally {
      await this.kafkaProducer.produce('submission-judged', {
        submissionId,
        status: finalVerdict,
        roomId,
      });
    }
  }
}