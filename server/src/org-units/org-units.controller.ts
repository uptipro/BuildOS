import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { OrgUnitsService } from './org-units.service';

@Controller('org-units')
export class OrgUnitsController {
    constructor(private readonly orgUnitsService: OrgUnitsService) { }

    @Get()
    findAll(@Query('kind') kind?: string) {
        return this.orgUnitsService.findAll(kind);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orgUnitsService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.orgUnitsService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.orgUnitsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orgUnitsService.remove(id);
    }
}
