import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DailyReportsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.dailyReport.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.dailyReport.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.dailyReport.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.dailyReport.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.dailyReport.delete({ where: { id } });
    }
}
