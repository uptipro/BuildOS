import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const FINANCE_CONFIG_KEY = 'finance-config';
const SCHEDULED_POSTINGS_KEY = 'finance-scheduled-postings';
const PAYMENT_METHODS_KEY = 'finance-payment-methods';
const PROCESS_MAPPINGS_KEY = 'finance-process-mappings';

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

    // ── Scheduled Postings ──
    private async readSetting<T>(key: string, fallback: T): Promise<T> {
        const row = await this.prisma.systemSetting.findUnique({ where: { key } });
        return (row?.value as T) ?? fallback;
    }
    private async writeSetting(key: string, value: unknown): Promise<void> {
        const clean = JSON.parse(JSON.stringify(value ?? null));
        await this.prisma.systemSetting.upsert({
            where: { key },
            create: { key, value: clean },
            update: { value: clean },
        });
    }

    findScheduledPostings() {
        return this.readSetting<any[]>(SCHEDULED_POSTINGS_KEY, []);
    }
    async createScheduledPosting(data: any) {
        const postings = await this.findScheduledPostings();
        const created = { id: `sp-${Date.now()}`, ...data };
        postings.unshift(created);
        await this.writeSetting(SCHEDULED_POSTINGS_KEY, postings);
        return created;
    }
    async deleteScheduledPosting(id: string) {
        const postings = await this.findScheduledPostings();
        await this.writeSetting(
            SCHEDULED_POSTINGS_KEY,
            postings.filter((p: any) => p.id !== id),
        );
        return { id, deleted: true };
    }

    // ── Payment Methods ──
    findPaymentMethods() {
        return this.readSetting<Record<string, boolean>>(PAYMENT_METHODS_KEY, {});
    }
    async togglePaymentMethod(id: string) {
        const methods = await this.findPaymentMethods();
        methods[id] = !methods[id];
        await this.writeSetting(PAYMENT_METHODS_KEY, methods);
        return { id, enabled: methods[id] };
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

    // ── Config ──
    getConfig() {
        return this.readSetting<Record<string, unknown>>(FINANCE_CONFIG_KEY, {});
    }
    async saveConfig(data: any) {
        const current = await this.getConfig();
        const merged = { ...current, ...(data ?? {}) };
        await this.writeSetting(FINANCE_CONFIG_KEY, merged);
        return { saved: true, ...merged };
    }

    // ── Process / Account Mappings (GL posting rules) ──
    getProcessMappings() {
        return this.readSetting<any[]>(PROCESS_MAPPINGS_KEY, []);
    }
    async saveProcessMappings(mappings: any[]) {
        const list = Array.isArray(mappings) ? mappings : [];
        await this.writeSetting(PROCESS_MAPPINGS_KEY, list);
        return list;
    }
}
