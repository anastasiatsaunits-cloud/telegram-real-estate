import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('health')
  getHealth() {
    return this.leadsService.getHealth();
  }

  @Post()
  createLead(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }
}
