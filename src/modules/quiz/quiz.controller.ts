import { Controller, Get } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
    @Get()
    getQuiz(): number[] {
        return [1, 2]
    }
}
