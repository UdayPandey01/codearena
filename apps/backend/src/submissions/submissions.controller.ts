import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { SubmitProblemDto } from "./dto/submit-problem.dto";
import { SubmissionService } from "./submissions.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('submissions')
export class SubmissionController {
    constructor(private readonly submissionService : SubmissionService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    submit(
        @Body(new ValidationPipe()) dto: SubmitProblemDto,
        @Request() req
    ) {
        const userId = req.user.id;
        return this.submissionService.submit(dto, userId);
    }
}