import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ClustersService } from './clusters.service';

@Controller('clusters')
export class ClustersController {
    constructor(private readonly clustersService: ClustersService) { }

    @Get()
    findAll() {
        return this.clustersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clustersService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.clustersService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.clustersService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clustersService.remove(id);
    }
}
