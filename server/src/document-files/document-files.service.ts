import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentFilesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.documentFile.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.documentFile.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.documentFile.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.documentFile.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.documentFile.delete({ where: { id } });
    }
}
