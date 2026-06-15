import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller('equipment')
export class EquipmentController {
    constructor(private readonly equipmentService: EquipmentService) { }

    @Get()
    findAll() {
        return this.equipmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.equipmentService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.equipmentService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.equipmentService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.equipmentService.remove(id);
    }
}
