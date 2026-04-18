import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  getProperties(@Query('region') regionSlug?: string) {
    return this.propertiesService.findAll(regionSlug);
  }

  @Get(':slug')
  getPropertyBySlug(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }
}
