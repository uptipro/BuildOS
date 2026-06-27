import { Module } from '@nestjs/common';
import { VisitorLogsController } from './visitor-logs.controller';
import { VisitorLogsService } from './visitor-logs.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [VisitorLogsController],
    providers: [VisitorLogsService],
})
export class VisitorLogsModule { }
