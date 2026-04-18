import { Controller, Get } from '@nestjs/common';

@Controller('regions')
export class RegionsController {
  @Get()
  getRegions() {
    return { items: [] };
  }
}
