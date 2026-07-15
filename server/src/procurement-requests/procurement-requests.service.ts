import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WebhookService } from '../integrations/webhook.service';

@Injectable()
export class ProcurementRequestsService {
    constructor(
        private prisma: PrismaService,
        private webhookService: WebhookService,
    ) {}

    // ── Purchase Requests ──
    findAllPRs(status?: string) {
        return this.prisma.purchaseRequest.findMany({
            where: status ? { status } : {},
            orderBy: { createdAt: 'desc' },
        });
    }
    findPR(id: string) {
        return this.prisma.purchaseRequest.findUniqueOrThrow({ where: { id } });
    }
    createPR(data: any) {
        const prRef = `PR-${Date.now()}`;
        return this.prisma.purchaseRequest.create({ data: { ...data, prRef } }).then((pr) => {
            this.webhookService.triggerWebhook('purchase-request.created', pr).catch(() => {});
            return pr;
        });
    }
    updatePR(id: string, data: any) {
        return this.prisma.purchaseRequest.update({ where: { id }, data });
    }
    deletePR(id: string) {
        return this.prisma.purchaseRequest.delete({ where: { id } });
    }

    // ── Purchase Invoices ──
    findAllInvoices(status?: string) {
        return this.prisma.purchaseInvoice.findMany({
            where: status ? { status } : {},
            orderBy: { createdAt: 'desc' },
        });
    }
    findInvoice(id: string) {
        return this.prisma.purchaseInvoice.findUniqueOrThrow({ where: { id } });
    }
    createInvoice(data: any) {
        const invoiceNo = `INV-${Date.now()}`;
        return this.prisma.purchaseInvoice.create({ data: { ...data, invoiceNo } });
    }
    updateInvoice(id: string, data: any) {
        return this.prisma.purchaseInvoice.update({ where: { id }, data });
    }
    deleteInvoice(id: string) {
        return this.prisma.purchaseInvoice.delete({ where: { id } });
    }

    // ── Sent RFQs ──
    findAllRFQs(status?: string) {
        return this.prisma.sentRFQ.findMany({
            where: status ? { status } : {},
            orderBy: { sentDate: 'desc' },
        });
    }
    findRFQ(id: string) {
        return this.prisma.sentRFQ.findUniqueOrThrow({ where: { id } });
    }
    createRFQ(data: any) {
        const rfqRef = `RFQ-${Date.now()}`;
        return this.prisma.sentRFQ.create({ data: { ...data, rfqRef } }).then((rfq) => {
            this.webhookService.triggerWebhook('rfq.sent', rfq).catch(() => {});
            return rfq;
        });
    }
    updateRFQ(id: string, data: any) {
        return this.prisma.sentRFQ.update({ where: { id }, data });
    }
    deleteRFQ(id: string) {
        return this.prisma.sentRFQ.delete({ where: { id } });
    }

    // ── Received Quotes ──
    findAllQuotes(status?: string) {
        return this.prisma.receivedQuote.findMany({
            where: status ? { status } : {},
            orderBy: { receivedDate: 'desc' },
        });
    }
    findQuote(id: string) {
        return this.prisma.receivedQuote.findUniqueOrThrow({ where: { id } });
    }
    createQuote(data: any) {
        return this.prisma.receivedQuote.create({ data });
    }
    updateQuote(id: string, data: any) {
        return this.prisma.receivedQuote.update({ where: { id }, data });
    }
    deleteQuote(id: string) {
        return this.prisma.receivedQuote.delete({ where: { id } });
    }
}
