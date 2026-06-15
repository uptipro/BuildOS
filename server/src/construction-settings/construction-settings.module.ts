import { Module } from '@nestjs/common';
import { ConstructionSettingsController } from './construction-settings.controller';
import { ConstructionSettingsService } from './construction-settings.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ConstructionSettingsController],
    providers: [ConstructionSettingsService],
})
export class ConstructionSettingsModule { }
