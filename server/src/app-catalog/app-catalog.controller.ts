import { Controller, Get } from '@nestjs/common';
import { AppCatalogService } from './app-catalog.service';

@Controller()
export class AppCatalogController {
    constructor(private readonly svc: AppCatalogService) { }

    @Get('app-catalog')
    getCatalog() {
        return this.svc.findAll();
    }
}
