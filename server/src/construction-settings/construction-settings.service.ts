import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConstructionSettingsService {
    constructor(private prisma: PrismaService) { }

    findAll(_projectId?: string) {
        return this.prisma.constructionSetting.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }

    findOne(id: string) {
        return this.prisma.constructionSetting.findUniqueOrThrow({ where: { id } });
    }

    create(data: any) {
        return this.prisma.constructionSetting.create({ data });
    }

    update(id: string, data: any) {
        return this.prisma.constructionSetting.update({ where: { id }, data });
    }

    remove(id: string) {
        return this.prisma.constructionSetting.delete({ where: { id } });
    }
}
