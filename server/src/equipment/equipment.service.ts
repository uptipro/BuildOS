import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EquipmentService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.equipment.findMany({ orderBy: { name: 'asc' } });
    }

    findOne(id: string) {
        return this.prisma.equipment.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.equipment.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.equipment.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.equipment.delete({ where: { id } });
    }
}
