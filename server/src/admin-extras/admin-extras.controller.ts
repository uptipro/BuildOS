import {
    Controller, Get, Post, Put, Patch, Delete,
    Param, Body, Query,
} from '@nestjs/common';
import { AdminExtrasService } from './admin-extras.service';

@Controller()
export class AdminExtrasController {
    constructor(private readonly svc: AdminExtrasService) { }

    @Get('approvals')
    getApprovals(@Query('module') module?: string) { return this.svc.findApprovals(module); }

    @Patch('approvals/:id')
    updateApproval(@Param('id') id: string, @Body() body: any) { return this.svc.updateApproval(id, body); }

    @Get('reference-data')
    getReferenceData() { return this.svc.referenceData(); }

    @Get('admin/system-summary')
    getSystemSummary() { return this.svc.systemSummary(); }

    @Get('admin/activity-log')
    getActivityLog() { return this.svc.activityLog(); }

    @Get('audit-logs')
    getAuditLogs(@Query('limit') limit?: number, @Query('offset') offset?: number) { 
        return this.svc.getAuditLogs(limit, offset); 
    }

    // ── Users ──
    @Post('admin/users/invite')
    inviteUser(@Body() body: { email: string; name: string; role?: string; assignedApps?: string[]; department?: string }) { return this.svc.inviteUser(body); }
    @Post('admin/users/:id/resend-invite')
    resendInvite(@Param('id') id: string) { return this.svc.resendInvite(id); }
    @Get('users')
    getAllUsers(@Query('search') search?: string) { return this.svc.findAllUsers(search); }
    @Get('users/:id')
    getUser(@Param('id') id: string) { return this.svc.findUser(id); }
    @Post('users')
    createUser(@Body() body: any) { return this.svc.createUser(body); }
    @Put('users/:id')
    updateUser(@Param('id') id: string, @Body() body: any) { return this.svc.updateUser(id, body); }
    @Delete('users/:id')
    deleteUser(@Param('id') id: string) { return this.svc.deleteUser(id); }

    // ── App Roles ──
    @Get('app-roles')
    getAllRoles() { return this.svc.findAllRoles(); }
    @Get('app-roles/:id')
    getRole(@Param('id') id: string) { return this.svc.findRole(id); }
    @Post('app-roles')
    createRole(@Body() body: any) { return this.svc.createRole(body); }
    @Put('app-roles/:id')
    updateRole(@Param('id') id: string, @Body() body: any) { return this.svc.updateRole(id, body); }
    @Delete('app-roles/:id')
    deleteRole(@Param('id') id: string) { return this.svc.deleteRole(id); }

    // ── Issue Types ──
    @Get('admin/issue-types')
    getIssueTypes() { return this.svc.findAllIssueTypes(); }
    @Post('admin/issue-types')
    createIssueType(@Body() body: any) { return this.svc.createIssueType(body); }
    @Put('admin/issue-types/:id')
    updateIssueType(@Param('id') id: string, @Body() body: any) { return this.svc.updateIssueType(id, body); }
    @Delete('admin/issue-types/:id')
    deleteIssueType(@Param('id') id: string) { return this.svc.deleteIssueType(id); }

    // ── Change Categories ──
    @Get('admin/change-categories')
    getChangeCategories() { return this.svc.findAllChangeCategories(); }
    @Post('admin/change-categories')
    createChangeCategory(@Body() body: any) { return this.svc.createChangeCategory(body); }
    @Put('admin/change-categories/:id')
    updateChangeCategory(@Param('id') id: string, @Body() body: any) { return this.svc.updateChangeCategory(id, body); }
    @Delete('admin/change-categories/:id')
    deleteChangeCategory(@Param('id') id: string) { return this.svc.deleteChangeCategory(id); }

    // ── Process Catalog ──
    @Get('admin/process-catalog')
    getProcessCatalog() { return this.svc.findProcessCatalog(); }
    @Post('admin/process-catalog')
    createProcessCatalogItem(@Body() body: any) { return this.svc.createProcessCatalogItem(body); }
    @Patch('admin/process-catalog/:id')
    updateProcessCatalogItem(@Param('id') id: string, @Body() body: any) { return this.svc.updateProcessCatalogItem(id, body); }
    @Delete('admin/process-catalog/:id')
    deleteProcessCatalogItem(@Param('id') id: string) { return this.svc.deleteProcessCatalogItem(id); }

    // ── Process Workflows ──
    @Get('admin/process-workflows')
    getProcessWorkflows() { return this.svc.findProcessWorkflows(); }
    @Post('admin/process-workflows')
    createProcessWorkflow(@Body() body: any) { return this.svc.createProcessWorkflow(body); }
    @Patch('admin/process-workflows/:id')
    updateProcessWorkflow(@Param('id') id: string, @Body() body: any) { return this.svc.updateProcessWorkflow(id, body); }
    @Delete('admin/process-workflows/:id')
    deleteProcessWorkflow(@Param('id') id: string) { return this.svc.deleteProcessWorkflow(id); }

    // ── Company Profile ──
    @Get('company-profile')
    getCompanyProfile() { return this.svc.getCompanyProfile(); }
    @Put('company-profile')
    updateCompanyProfile(@Body() body: any) { return this.svc.updateCompanyProfile(body); }

    // ── Directors ──
    @Get('directors')
    getAllDirectors() { return this.svc.findAllDirectors(); }
    @Post('directors')
    createDirector(@Body() body: any) { return this.svc.createDirector(body); }
    @Put('directors/:id')
    updateDirector(@Param('id') id: string, @Body() body: any) { return this.svc.updateDirector(id, body); }
    @Delete('directors/:id')
    deleteDirector(@Param('id') id: string) { return this.svc.deleteDirector(id); }

    // ── Email Config ──
    @Get('email-config')
    getEmailConfigs() { return this.svc.findEmailConfigs(); }
    @Post('email-config')
    createEmailConfig(@Body() body: any) { return this.svc.createEmailConfig(body); }
    @Patch('email-config/:id')
    updateEmailConfig(@Param('id') id: string, @Body() body: any) { return this.svc.updateEmailConfig(id, body); }
    @Delete('email-config/:id')
    deleteEmailConfig(@Param('id') id: string) { return this.svc.deleteEmailConfig(id); }

    // ── Units of Measurement ──
    @Get('units')
    getUnits() { return this.svc.findUnits(); }
    @Post('units')
    createUnit(@Body() body: any) { return this.svc.createUnit(body); }
    @Patch('units/:id')
    updateUnit(@Param('id') id: string, @Body() body: any) { return this.svc.updateUnit(id, body); }
    @Delete('units/:id')
    deleteUnit(@Param('id') id: string) { return this.svc.deleteUnit(id); }

    // ── API Keys ──
    @Get('api-keys')
    getApiKeys() { return this.svc.findApiKeys(); }

    // ── Webhooks ──
    @Get('webhooks')
    getWebhooks() { return this.svc.findWebhooks(); }

    // ── Email Templates ──
    @Get('email-templates')
    getEmailTemplates() { return this.svc.findEmailTemplates(); }

    // ── Notification Rules ──
    @Get('notification-rules')
    getNotificationRules() { return this.svc.findNotificationRules(); }

    // ── Report Schedules ──
    @Get('report-schedules')
    getReportSchedules() { return this.svc.findReportSchedules(); }
}
