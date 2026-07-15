import { Module } from '@nestjs/common';
import { ProcurementRequestsController } from './procurement-requests.controller';
import { ProcurementRequestsService } from './procurement-requests.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
    imports: [PrismaModule, IntegrationsModule],
    controllers: [ProcurementRequestsController],
    providers: [ProcurementRequestsService],
})
export class ProcurementRequestsModule { }
