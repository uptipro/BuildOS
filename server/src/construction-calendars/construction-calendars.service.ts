import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConstructionCalendarsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.constructionCalendar.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.constructionCalendar.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.constructionCalendar.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.constructionCalendar.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.constructionCalendar.delete({ where: { id } });
    }
}
