import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FundingAllocationsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.fundingAllocation.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.fundingAllocation.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.fundingAllocation.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.fundingAllocation.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.fundingAllocation.delete({ where: { id } });
    }
}
