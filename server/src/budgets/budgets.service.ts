import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BudgetsService {
    constructor(private prisma: PrismaService) { }

    findAll(status?: string, scope?: string) {
        return this.prisma.budget.findMany({
            where: {
                ...(status ? { status: status as any } : {}),
                ...(scope ? { scope: scope as any } : {}),
            },
            include: { project: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.budget.findUniqueOrThrow({
            where: { id },
            include: { project: true },
        });
    }

    create(data: any) {
        return this.prisma.budget.create({ data, include: { project: true } });
    }

    update(id: string, data: any) {
        return this.prisma.budget.update({ where: { id }, data, include: { project: true } });
    }

    remove(id: string) {
        return this.prisma.budget.delete({ where: { id } });
    }
}
