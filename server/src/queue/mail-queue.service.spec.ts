import { MailQueueService } from './mail-queue.service';
import type { EmailPayload } from '../email/email.service';

describe('MailQueueService', () => {
    const payload: EmailPayload = { to: 'a@b.c', subject: 'Hi', text: 'x' };

    it('sends inline when no queue is configured', async () => {
        const email = { sendNow: jest.fn().mockResolvedValue(undefined) };
        const svc = new MailQueueService(email as never, undefined);
        const res = await svc.enqueueEmail(payload);
        expect(res).toEqual({ queued: false });
        expect(email.sendNow).toHaveBeenCalledWith(payload);
    });

    it('enqueues when a queue is available and does not send inline', async () => {
        const email = { sendNow: jest.fn() };
        const queue = { add: jest.fn().mockResolvedValue(undefined) };
        const svc = new MailQueueService(email as never, queue as never);
        const res = await svc.enqueueEmail(payload);
        expect(res).toEqual({ queued: true });
        expect(queue.add).toHaveBeenCalled();
        expect(email.sendNow).not.toHaveBeenCalled();
    });

    it('falls back to inline send when enqueue fails', async () => {
        const email = { sendNow: jest.fn().mockResolvedValue(undefined) };
        const queue = { add: jest.fn().mockRejectedValue(new Error('redis down')) };
        const svc = new MailQueueService(email as never, queue as never);
        const res = await svc.enqueueEmail(payload);
        expect(res).toEqual({ queued: false });
        expect(email.sendNow).toHaveBeenCalledWith(payload);
    });
});
