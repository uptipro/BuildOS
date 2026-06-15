import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChangeRequestsService {
    constructor(private prisma: PrismaService) { }

    findAll(projectId?: string) {
        return this.prisma.changeRequest.findMany({
            where: projectId ? { projectId } : undefined,
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.changeRequest.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.changeRequest.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.changeRequest.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.changeRequest.delete({ where: { id } });
    }
}
