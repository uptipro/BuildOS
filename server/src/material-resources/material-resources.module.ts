import { Module } from '@nestjs/common';
import { MaterialResourcesController } from './material-resources.controller';
import { MaterialResourcesService } from './material-resources.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MaterialResourcesController],
    providers: [MaterialResourcesService],
})
export class MaterialResourcesModule { }
