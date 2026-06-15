import { Module } from '@nestjs/common';
import { HseRecordsController } from './hse-records.controller';
import { HseRecordsService } from './hse-records.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [HseRecordsController],
    providers: [HseRecordsService],
})
export class HseRecordsModule { }
