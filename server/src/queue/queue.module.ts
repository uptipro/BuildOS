import { Global, Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { getRedisConnectionOptions, isRedisEnabled } from '../redis/redis.config';
import { EmailModule } from '../email/email.module';
import { MailQueueService } from './mail-queue.service';
import { MailProcessor } from './mail.processor';
import { MAIL_QUEUE } from './queue.constants';

const redisEnabled = isRedisEnabled();

/**
 * Background job infrastructure (BullMQ over Redis).
 *
 * When Redis is configured the BullMQ root + named queues + workers are
 * registered. When it is not, only the producer services are provided and they
 * fall back to inline execution, so the application runs without Redis.
 */
@Global()
@Module({
    imports: [
        EmailModule,
        ...(redisEnabled
            ? [
                  BullModule.forRoot({
                      connection: getRedisConnectionOptions({
                          maxRetriesPerRequest: null,
                          enableReadyCheck: false,
                      }),
                  }),
                  BullModule.registerQueue({ name: MAIL_QUEUE }),
              ]
            : []),
    ],
    providers: [MailQueueService, ...(redisEnabled ? [MailProcessor] : [])],
    exports: [MailQueueService],
})
export class QueueModule {
    constructor() {
        if (!redisEnabled) {
            new Logger('QueueModule').warn(
                'Redis not configured — background queues disabled; emails send inline.',
            );
        }
    }
}
