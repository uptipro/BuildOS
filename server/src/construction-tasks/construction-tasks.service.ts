import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConstructionTasksService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.constructionTask.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.constructionTask.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.constructionTask.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.constructionTask.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.constructionTask.delete({ where: { id } });
    }
}
