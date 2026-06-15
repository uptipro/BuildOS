import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HseRecordsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.hseRecord.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.hseRecord.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.hseRecord.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.hseRecord.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.hseRecord.delete({ where: { id } });
    }
}
