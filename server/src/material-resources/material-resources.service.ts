import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialResourcesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.materialResource.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.materialResource.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.materialResource.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.materialResource.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.materialResource.delete({ where: { id } });
    }
}
