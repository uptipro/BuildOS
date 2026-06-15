import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QualityNcrsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.qualityNcr.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.qualityNcr.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.qualityNcr.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.qualityNcr.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.qualityNcr.delete({ where: { id } });
    }
}
