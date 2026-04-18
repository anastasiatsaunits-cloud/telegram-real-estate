import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  getProperties(
    @Query('region') regionSlug?: string,
    @Query('budgetMin') budgetMin?: string,
    @Query('budgetMax') budgetMax?: string,
  ) {
    return this.propertiesService.findAll(regionSlug, budgetMin, budgetMax);
  }

  @Get(':slug')
  getPropertyBySlug(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }
}
