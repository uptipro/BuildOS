import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { MAIL_QUEUE } from './queue.constants';
import { EmailService, type EmailPayload } from '../email/email.service';

/**
 * BullMQ worker that delivers queued emails. Only registered when Redis is
 * configured (see QueueModule). Failures bubble up so BullMQ applies the
 * configured retry/backoff policy.
 */
@Processor(MAIL_QUEUE)
export class MailProcessor extends WorkerHost {
    private readonly logger = new Logger(MailProcessor.name);

    constructor(private readonly emailService: EmailService) {
        super();
    }

    async process(job: Job<EmailPayload>): Promise<void> {
        this.logger.log(`Processing email job ${job.id} → ${String(job.data.to)}`);
        await this.emailService.sendNow(job.data);
    }
}
