import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrgUnitsService {
    constructor(private prisma: PrismaService) { }

    findAll(kind?: string) {
        return this.prisma.orgUnit.findMany({
            where: kind ? { kind } : undefined,
            orderBy: [{ kind: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
        });
    }

    findOne(id: string) {
        return this.prisma.orgUnit.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.orgUnit.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.orgUnit.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.orgUnit.delete({ where: { id } });
    }
}
