import { Module } from '@nestjs/common';
import { ConstructionIssuesController } from './construction-issues.controller';
import { ConstructionIssuesService } from './construction-issues.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ConstructionIssuesController],
    providers: [ConstructionIssuesService],
})
export class ConstructionIssuesModule { }
