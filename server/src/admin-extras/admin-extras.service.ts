import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminExtrasService {
    constructor(private prisma: PrismaService) { }

    // ── Users ──
    findAllUsers(search?: string) {
        return this.prisma.user.findMany({
            where: search
                ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : {},
            select: {
                id: true, name: true, email: true, role: true,
                department: true, phone: true, status: true, lastLogin: true,
                createdAt: true,
            },
            orderBy: { name: 'asc' },
        });
    }

    findUser(id: string) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
            select: {
                id: true, name: true, email: true, role: true,
                department: true, phone: true, status: true, lastLogin: true,
                createdAt: true,
            },
        });
    }

    async createUser(data: any) {
        const hashed = await bcrypt.hash(data.password || 'BuildOS@2025', 10);
        return this.prisma.user.create({
            data: { ...data, password: hashed },
            select: {
                id: true, name: true, email: true, role: true,
                department: true, phone: true, status: true, createdAt: true,
            },
        });
    }

    async updateUser(id: string, data: any) {
        const { password, ...rest } = data;
        const update: any = { ...rest };
        if (password) update.password = await bcrypt.hash(password, 10);
        return this.prisma.user.update({
            where: { id },
            data: update,
            select: {
                id: true, name: true, email: true, role: true,
                department: true, phone: true, status: true, createdAt: true,
            },
        });
    }

    deleteUser(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }

    // ── App Roles ──
    findAllRoles() {
        return this.prisma.appRole.findMany({ orderBy: { name: 'asc' } });
    }
    findRole(id: string) {
        return this.prisma.appRole.findUniqueOrThrow({ where: { id } });
    }
    createRole(data: any) {
        return this.prisma.appRole.create({ data });
    }
    updateRole(id: string, data: any) {
        return this.prisma.appRole.update({ where: { id }, data });
    }
    deleteRole(id: string) {
        return this.prisma.appRole.delete({ where: { id } });
    }
}
