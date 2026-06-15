import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommunicationsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.communicationLog.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.communicationLog.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.communicationLog.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.communicationLog.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.communicationLog.delete({ where: { id } });
    }
}
