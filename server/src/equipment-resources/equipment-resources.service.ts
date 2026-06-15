import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentResourcesService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.equipmentResource.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.equipmentResource.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.equipmentResource.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.equipmentResource.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.equipmentResource.delete({ where: { id } });
    }
}
