import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DelaysService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.projectDelay.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.projectDelay.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.projectDelay.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.projectDelay.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.projectDelay.delete({ where: { id } });
    }
}
