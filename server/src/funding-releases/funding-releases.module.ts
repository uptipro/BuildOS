import { Module } from '@nestjs/common';
import { FundingReleasesController } from './funding-releases.controller';
import { FundingReleasesService } from './funding-releases.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [FundingReleasesController],
    providers: [FundingReleasesService],
})
export class FundingReleasesModule { }
