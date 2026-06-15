import { Module } from '@nestjs/common';
import { ConstructionCalendarsController } from './construction-calendars.controller';
import { ConstructionCalendarsService } from './construction-calendars.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ConstructionCalendarsController],
    providers: [ConstructionCalendarsService],
})
export class ConstructionCalendarsModule { }
