import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContractorsService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.contractor.findMany({ orderBy: { createdAt: 'asc' } });
    }

    findOne(id: string) {
        return this.prisma.contractor.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.contractor.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.contractor.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.contractor.delete({ where: { id } });
    }
}
