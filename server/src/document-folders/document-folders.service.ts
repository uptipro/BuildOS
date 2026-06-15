import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentFoldersService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.documentFolder.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { name: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.documentFolder.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.documentFolder.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.documentFolder.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.documentFolder.delete({ where: { id } });
    }
}
