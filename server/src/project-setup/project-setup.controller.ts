import { Controller, Get, Put, Post, Body, Param } from '@nestjs/common';
import { ProjectSetupService } from './project-setup.service';

@Controller('project-setup')
export class ProjectSetupController {
    constructor(private readonly projectSetupService: ProjectSetupService) { }

    @Get(':projectId')
    findOne(@Param('projectId') projectId: string) {
        return this.projectSetupService.findOne(projectId);
    }

    @Put(':projectId')
    save(@Param('projectId') projectId: string, @Body() body: any) {
        return this.projectSetupService.save(projectId, body);
    }

    @Post(':projectId/lock')
    lock(@Param('projectId') projectId: string, @Body() body: any) {
        return this.projectSetupService.lock(projectId, body?.performedBy);
    }

    @Post(':projectId/unlock')
    unlock(@Param('projectId') projectId: string, @Body() body: any) {
        return this.projectSetupService.unlock(projectId, body?.reason, body?.performedBy);
    }
}
