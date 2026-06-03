import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FinanceExtrasService {
    constructor(private prisma: PrismaService) { }

    // ── Transactions ──
    findAllTransactions(type?: string, status?: string) {
        return this.prisma.transaction.findMany({
            where: {
                ...(type ? { type } : {}),
                ...(status ? { status } : {}),
            },
            orderBy: { date: 'desc' },
        });
    }
    findTransaction(id: string) {
        return this.prisma.transaction.findUniqueOrThrow({ where: { id } });
    }
    createTransaction(data: any) {
        return this.prisma.transaction.create({ data });
    }
    updateTransaction(id: string, data: any) {
        return this.prisma.transaction.update({ where: { id }, data });
    }
    deleteTransaction(id: string) {
        return this.prisma.transaction.delete({ where: { id } });
    }

    // ── Journal Entries ──
    findAllJournals(status?: string) {
        return this.prisma.journalEntry.findMany({
            where: status ? { status } : {},
            include: { lines: true },
            orderBy: { date: 'desc' },
        });
    }
    findJournal(id: string) {
        return this.prisma.journalEntry.findUniqueOrThrow({
            where: { id },
            include: { lines: true },
        });
    }
    createJournal(data: any) {
        const { lines, ...rest } = data;
        const ref = `JRN-${Date.now()}`;
        return this.prisma.journalEntry.create({
            data: {
                ...rest,
                reference: ref,
                lines: lines ? { create: lines } : undefined,
            },
            include: { lines: true },
        });
    }
    updateJournal(id: string, data: any) {
        const { lines, ...rest } = data;
        return this.prisma.journalEntry.update({
            where: { id },
            data: {
                ...rest,
                ...(lines
                    ? {
                        lines: {
                            deleteMany: {},
                            create: lines,
                        },
                    }
                    : {}),
            },
            include: { lines: true },
        });
    }
    deleteJournal(id: string) {
        return this.prisma.journalEntry.delete({ where: { id } });
    }

    // ── Chart of Accounts ──
    findAllAccounts(type?: string) {
        return this.prisma.chartAccount.findMany({
            where: type ? { type } : {},
            orderBy: { code: 'asc' },
        });
    }
    findAccount(id: string) {
        return this.prisma.chartAccount.findUniqueOrThrow({ where: { id } });
    }
    createAccount(data: any) {
        return this.prisma.chartAccount.create({ data });
    }
    updateAccount(id: string, data: any) {
        return this.prisma.chartAccount.update({ where: { id }, data });
    }
    deleteAccount(id: string) {
        return this.prisma.chartAccount.delete({ where: { id } });
    }

    // ── Bank Accounts ──
    findAllBankAccounts() {
        return this.prisma.bankAccount.findMany({ orderBy: { bankName: 'asc' } });
    }
    findBankAccount(id: string) {
        return this.prisma.bankAccount.findUniqueOrThrow({ where: { id } });
    }
    createBankAccount(data: any) {
        return this.prisma.bankAccount.create({ data });
    }
    updateBankAccount(id: string, data: any) {
        return this.prisma.bankAccount.update({ where: { id }, data });
    }
    deleteBankAccount(id: string) {
        return this.prisma.bankAccount.delete({ where: { id } });
    }

    // ── Tax Configs ──
    findAllTaxConfigs() {
        return this.prisma.taxConfig.findMany({ orderBy: { name: 'asc' } });
    }
    findTaxConfig(id: string) {
        return this.prisma.taxConfig.findUniqueOrThrow({ where: { id } });
    }
    createTaxConfig(data: any) {
        return this.prisma.taxConfig.create({ data });
    }
    updateTaxConfig(id: string, data: any) {
        return this.prisma.taxConfig.update({ where: { id }, data });
    }
    deleteTaxConfig(id: string) {
        return this.prisma.taxConfig.delete({ where: { id } });
    }

    // ── Scheduled Postings Stub Methods ──
    createScheduledPosting(data: any) {
        return { id: `sp-${Date.now()}`, ...data };
    }

    // ── Payment Methods Stub Methods ──
    togglePaymentMethod(id: string) {
        return { id, enabled: true };
    }

    // ── Report Templates ──
    async getReportTemplates() {
        const definitions = await this.prisma.reportDefinition.findMany({
            where: { module: { equals: 'finance', mode: 'insensitive' } },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                type: true,
                description: true,
                isScheduled: true,
                schedule: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const byType = definitions.reduce<Record<string, any[]>>((acc, item) => {
            const key = String(item.type || 'general').toLowerCase();
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});

        return {
            templates: definitions,
            grouped: byType,
        };
    }

    // ── Config Stub Methods ──
    saveConfig(data: any) {
        return { saved: true, ...data };
    }
}
