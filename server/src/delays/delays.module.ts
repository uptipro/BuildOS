import { Module } from '@nestjs/common';
import { DelaysController } from './delays.controller';
import { DelaysService } from './delays.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [DelaysController],
    providers: [DelaysService],
})
export class DelaysModule { }
