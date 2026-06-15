import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConstructionBaselinesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.constructionBaseline.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.constructionBaseline.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.constructionBaseline.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.constructionBaseline.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.constructionBaseline.delete({ where: { id } });
    }
}
