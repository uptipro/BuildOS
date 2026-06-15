import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FundingReleasesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.fundingRelease.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.fundingRelease.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.fundingRelease.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.fundingRelease.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.fundingRelease.delete({ where: { id } });
    }
}
