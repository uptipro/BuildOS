import { Injectable, Logger, Optional } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { Queue } from 'bullmq';
import { MAIL_JOB_SEND, MAIL_QUEUE } from './queue.constants';
import { EmailService, type EmailPayload } from '../email/email.service';

/**
 * Producer for outbound email.
 *
 * When BullMQ (Redis) is available, email is enqueued for resilient background
 * delivery with retries. When Redis is not configured, the queue provider is
 * absent and we fall back to sending inline — preserving the original
 * synchronous behaviour so existing deployments keep working.
 */
@Injectable()
export class MailQueueService {
    private readonly logger = new Logger(MailQueueService.name);

    constructor(
        private readonly emailService: EmailService,
        @Optional() @InjectQueue(MAIL_QUEUE) private readonly queue?: Queue,
    ) {}

    async enqueueEmail(payload: EmailPayload): Promise<{ queued: boolean }> {
        if (this.queue) {
            try {
                await this.queue.add(MAIL_JOB_SEND, payload, {
                    attempts: 3,
                    backoff: { type: 'exponential', delay: 5_000 },
                    removeOnComplete: 100,
                    removeOnFail: 500,
                });
                return { queued: true };
            } catch (error) {
                this.logger.warn(
                    `Failed to enqueue email, sending inline instead: ${(error as Error).message}`,
                );
            }
        }

        await this.emailService.sendNow(payload);
        return { queued: false };
    }
}
