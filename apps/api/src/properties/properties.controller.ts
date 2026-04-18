import { Controller, Get, Param } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  getProperties() {
    return this.propertiesService.findAll();
  }

  @Get(':slug')
  getPropertyBySlug(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }
}
