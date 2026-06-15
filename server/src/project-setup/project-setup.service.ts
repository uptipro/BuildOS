import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const SETUP_FIELDS = [
    'basicInfo',
    'projectType',
    'humanResources',
    'dailyReporting',
    'materials',
    'equipment',
    'calendar',
    'schedule',
    'setupComplete',
    'setupLocked',
    'currentStep',
    'completedSteps',
    'auditLog',
] as const;

function pickSetupData(body: any) {
    const data: Record<string, any> = {};
    for (const key of SETUP_FIELDS) {
        if (body?.[key] !== undefined) data[key] = body[key];
    }
    return data;
}

@Injectable()
export class ProjectSetupService {
    constructor(private prisma: PrismaService) { }

    findOne(projectId: string) {
        return this.prisma.projectSetup.findUnique({ where: { projectId } });
    }

    save(projectId: string, body: any) {
        const data = pickSetupData(body);
        return this.prisma.projectSetup.upsert({
            where: { projectId },
            create: { projectId, ...data },
            update: data,
        });
    }

    async lock(projectId: string, performedBy?: string) {
        const existing = await this.prisma.projectSetup.findUnique({ where: { projectId } });
        const auditLog = Array.isArray(existing?.auditLog) ? [...(existing!.auditLog as any[])] : [];
        auditLog.push({
            action: 'locked',
            performedBy: performedBy || 'Project Manager',
            performedAt: new Date().toISOString(),
            reason: 'Baseline locked',
        });
        return this.prisma.projectSetup.upsert({
            where: { projectId },
            create: { projectId, setupLocked: true, setupComplete: true, auditLog },
            update: { setupLocked: true, setupComplete: true, auditLog },
        });
    }

    async unlock(projectId: string, reason: string, performedBy?: string) {
        const existing = await this.prisma.projectSetup.findUnique({ where: { projectId } });
        const auditLog = Array.isArray(existing?.auditLog) ? [...(existing!.auditLog as any[])] : [];
        auditLog.push({
            action: 'unlocked',
            performedBy: performedBy || 'Project Manager',
            performedAt: new Date().toISOString(),
            reason: reason || 'Baseline unlocked',
        });
        return this.prisma.projectSetup.upsert({
            where: { projectId },
            create: { projectId, setupLocked: false, auditLog },
            update: { setupLocked: false, auditLog },
        });
    }
}
