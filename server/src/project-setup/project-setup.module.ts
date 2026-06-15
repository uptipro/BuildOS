import { Module } from '@nestjs/common';
import { ProjectSetupController } from './project-setup.controller';
import { ProjectSetupService } from './project-setup.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProjectSetupController],
    providers: [ProjectSetupService],
})
export class ProjectSetupModule { }
