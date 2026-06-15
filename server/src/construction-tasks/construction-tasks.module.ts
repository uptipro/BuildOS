import { Module } from '@nestjs/common';
import { ConstructionTasksController } from './construction-tasks.controller';
import { ConstructionTasksService } from './construction-tasks.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ConstructionTasksController],
    providers: [ConstructionTasksService],
})
export class ConstructionTasksModule { }
