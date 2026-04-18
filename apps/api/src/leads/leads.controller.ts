import { Controller, Get } from '@nestjs/common';

@Controller('leads')
export class LeadsController {
  @Get('health')
  getHealth() {
    return { module: 'leads', status: 'ok' };
  }
}
