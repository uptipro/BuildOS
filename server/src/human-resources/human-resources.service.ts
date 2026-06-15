import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HumanResourcesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.humanResource.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.humanResource.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.humanResource.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.humanResource.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.humanResource.delete({ where: { id } });
    }
}
