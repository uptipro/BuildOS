import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/roles.guard';
import { AdminExtrasService } from './admin-extras.service';

@Controller()
@UseGuards(RolesGuard)
export class ApprovalsPublicController {
    constructor(private readonly svc: AdminExtrasService) { }

    @Get('approvals')
    @Roles('admin', 'approver')
    getApprovals(@Query('module') module?: string) {
        return this.svc.findApprovals(module);
    }

    @Patch('approvals/:id')
    @Roles('admin', 'approver')
    updateApproval(@Param('id') id: string, @Body() body: any) {
        return this.svc.updateApproval(id, body);
    }
}
