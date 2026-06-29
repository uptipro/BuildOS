import { Module } from '@nestjs/common';
import { OrgUnitsController } from './org-units.controller';
import { OrgUnitsService } from './org-units.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [OrgUnitsController],
    providers: [OrgUnitsService],
})
export class OrgUnitsModule { }
