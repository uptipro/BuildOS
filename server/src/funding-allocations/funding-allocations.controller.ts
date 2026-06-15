import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { FundingAllocationsService } from './funding-allocations.service';

@Controller('funding-allocations')
export class FundingAllocationsController {
    constructor(private readonly service: FundingAllocationsService) { }

    @Get()
    findAll(@Query('projectId') projectId?: string) {
        return this.service.findAll(projectId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
