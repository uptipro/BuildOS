import { Module } from '@nestjs/common';
import { FundingAllocationsController } from './funding-allocations.controller';
import { FundingAllocationsService } from './funding-allocations.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [FundingAllocationsController],
    providers: [FundingAllocationsService],
})
export class FundingAllocationsModule { }
