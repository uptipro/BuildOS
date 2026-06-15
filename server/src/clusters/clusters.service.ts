import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClustersService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.cluster.findMany({ orderBy: { name: 'asc' } });
    }

    findOne(id: string) {
        return this.prisma.cluster.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.cluster.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.cluster.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.cluster.delete({ where: { id } });
    }
}
