import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators';

@Controller()
export class HealthController {
    @Public()
    @Get()
    health() {
        return { status: 'ok' };
    }
}