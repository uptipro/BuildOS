import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StakeholdersService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.stakeholder.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { name: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.stakeholder.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.stakeholder.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.stakeholder.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.stakeholder.delete({ where: { id } });
    }
}
