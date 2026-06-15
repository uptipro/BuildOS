import { Module } from '@nestjs/common';
import { DisbursementsController } from './disbursements.controller';
import { DisbursementsService } from './disbursements.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [DisbursementsController],
    providers: [DisbursementsService],
})
export class DisbursementsModule { }
