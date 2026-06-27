import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VisitorLogsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.visitorLog.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { date: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.visitorLog.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.visitorLog.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.visitorLog.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.visitorLog.delete({ where: { id } });
    }
}
