import { Module } from '@nestjs/common';
import { EquipmentResourcesController } from './equipment-resources.controller';
import { EquipmentResourcesService } from './equipment-resources.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EquipmentResourcesController],
    providers: [EquipmentResourcesService],
})
export class EquipmentResourcesModule { }
