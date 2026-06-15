import { Module } from '@nestjs/common';
import { DocumentFilesController } from './document-files.controller';
import { DocumentFilesService } from './document-files.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [DocumentFilesController],
    providers: [DocumentFilesService],
})
export class DocumentFilesModule { }
