import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConstructionIssuesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.constructionIssue.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.constructionIssue.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.constructionIssue.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.constructionIssue.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.constructionIssue.delete({ where: { id } });
    }
}
