import { Module } from "@nestjs/common";
import { SubmissionController } from "./submissions.controller";
import { SubmissionService } from "./submissions.service";

@Module({
    controllers : [SubmissionController],
    providers : [SubmissionService]
})

export class SubmissionModule {}