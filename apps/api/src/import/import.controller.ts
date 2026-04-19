import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ImportService } from './import.service';

type ImportPayload = {
  secret?: string;
  items?: Array<{
    id: string;
    title: string;
    slug: string;
    city: string;
    address: string | null;
    priceFrom: string | null;
    priceTo: string | null;
    areaFrom: string | null;
    areaTo: string | null;
    description: string;
    media: string[];
  }>;
};

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('apply-schema')
  async applySchema(@Body() payload: ImportPayload) {
    if (!payload.secret || payload.secret !== process.env.IMPORT_SECRET) {
      throw new UnauthorizedException('Invalid import secret');
    }

    return this.importService.applySchema();
  }

  @Post('n93-curated')
  async importN93Curated(@Body() payload: ImportPayload) {
    if (!payload.secret || payload.secret !== process.env.IMPORT_SECRET) {
      throw new UnauthorizedException('Invalid import secret');
    }

    return this.importService.importN93Curated(payload.items ?? []);
  }
}
