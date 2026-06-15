import { Module } from '@nestjs/common';
import { ConstructionBaselinesController } from './construction-baselines.controller';
import { ConstructionBaselinesService } from './construction-baselines.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ConstructionBaselinesController],
    providers: [ConstructionBaselinesService],
})
export class ConstructionBaselinesModule { }
