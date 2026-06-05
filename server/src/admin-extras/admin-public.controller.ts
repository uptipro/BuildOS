import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators';
import { RolesGuard } from '../auth/roles.guard';
import { AdminExtrasService } from './admin-extras.service';

@Controller()
@UseGuards(RolesGuard)
export class AdminPublicController {
    constructor(private readonly svc: AdminExtrasService) { }

    @Get('reference-data')
    @Roles('admin')
    getReferenceData() {
        return this.svc.referenceData();
    }

    @Get('company-profile')
    @Roles('admin')
    getCompanyProfile() {
        return this.svc.getCompanyProfile();
    }

    @Put('company-profile')
    @Roles('admin')
    updateCompanyProfile(@Body() body: any) {
        return this.svc.updateCompanyProfile(body);
    }
}
