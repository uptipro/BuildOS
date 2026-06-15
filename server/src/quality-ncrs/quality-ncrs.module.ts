import { Module } from '@nestjs/common';
import { QualityNcrsController } from './quality-ncrs.controller';
import { QualityNcrsService } from './quality-ncrs.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [QualityNcrsController],
    providers: [QualityNcrsService],
})
export class QualityNcrsModule { }
