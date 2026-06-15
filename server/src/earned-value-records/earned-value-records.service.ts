import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EarnedValueRecordsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.earnedValueRecord.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.earnedValueRecord.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.earnedValueRecord.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.earnedValueRecord.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.earnedValueRecord.delete({ where: { id } });
    }
}
