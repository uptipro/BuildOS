import { Module } from '@nestjs/common';
import { HumanResourcesController } from './human-resources.controller';
import { HumanResourcesService } from './human-resources.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [HumanResourcesController],
    providers: [HumanResourcesService],
})
export class HumanResourcesModule { }
