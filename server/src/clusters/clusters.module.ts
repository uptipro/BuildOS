import { Module } from '@nestjs/common';
import { ClustersController } from './clusters.controller';
import { ClustersService } from './clusters.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ClustersController],
    providers: [ClustersService],
})
export class ClustersModule { }
