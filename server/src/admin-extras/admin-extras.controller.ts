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

    @Get('reference-data')
    getReferenceData() { return this.svc.referenceData(); }

    @Get('admin/system-summary')
    getSystemSummary() { return this.svc.systemSummary(); }

    @Get('admin/activity-log')
    getActivityLog() { return this.svc.activityLog(); }

    // ── Users ──
    @Post('admin/users/invite')
    inviteUser(@Body() body: { email: string; name: string; role?: string }) { return this.svc.inviteUser(body); }
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
}
