import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { RegionsModule } from './regions/regions.module';
import { PropertiesModule } from './properties/properties.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HealthModule, RegionsModule, PropertiesModule, LeadsModule],
})
export class AppModule {}
