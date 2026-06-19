import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from './audit-log.service';

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  constructor(private auditLogService: AuditLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ipAddress = req.ip || req.connection.remoteAddress;
    const auditLogService = this.auditLogService;

    // Intercept the response to capture status and potentially log data changes
    const originalSend = res.send;

    res.send = function (data: any) {
      // Only log non-GET requests
      if (req.method !== 'GET') {
        // Resolve the acting user at response time: authentication guards run
        // after this middleware is set up, so req.user is only populated by the
        // time the response is actually sent. The JWT payload stores the user id
        // in `sub`.
        const user = req.user as any;
        const userId = user?.sub || user?.id || null;

        // Extract entity type and action from the request path
        const pathParts = req.path.split('/').filter((p) => p);
        const entity = pathParts[pathParts.length - 1] || 'unknown';

        let action = 'READ';
        switch (req.method) {
          case 'POST':
            action = 'CREATE';
            break;
          case 'PUT':
          case 'PATCH':
            action = 'UPDATE';
            break;
          case 'DELETE':
            action = 'DELETE';
            break;
        }

        // Only log successful operations (2xx, 3xx status codes)
        if (res.statusCode < 400) {
          // Schedule audit log in background - don't wait for it
          Promise.resolve().then(() => {
            auditLogService
              .logAction(
                userId,
                entity,
                null,
                action,
                `${req.method} ${req.path}`,
                null,
                data ? JSON.stringify(data).substring(0, 500) : null,
                ipAddress,
              )
              .catch((err) => {
                console.error('Failed to log audit:', err);
              });
          });
        }
      }

      return originalSend.call(this, data);
    };

    next();
  }
}
