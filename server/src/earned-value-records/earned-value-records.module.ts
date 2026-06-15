import { Module } from '@nestjs/common';
import { EarnedValueRecordsController } from './earned-value-records.controller';
import { EarnedValueRecordsService } from './earned-value-records.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EarnedValueRecordsController],
    providers: [EarnedValueRecordsService],
})
export class EarnedValueRecordsModule { }
