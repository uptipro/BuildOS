import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DisbursementsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.disbursement.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.disbursement.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.disbursement.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.disbursement.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.disbursement.delete({ where: { id } });
    }
}
