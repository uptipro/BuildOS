import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.vendor.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.vendor.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.vendor.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.vendor.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.vendor.delete({ where: { id } });
    }
}
