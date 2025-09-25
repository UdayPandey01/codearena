// apps/executor-service/src/processing/types.ts

// The structure of the message received from the 'submission-created' topic
export interface SubmissionJob {
  submissionId: string;
  sourceCode: string;
  languageId: number;
  problemId: string;
  roomId?: string; // Optional for real-time battles
}

// The structure of a single test case stored in your database
export interface TestCase {
  input: string;
  output: string;
}