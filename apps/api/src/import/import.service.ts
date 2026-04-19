import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type ImportProperty = {
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
};

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importN93Curated(items: ImportProperty[]) {
    await this.prisma.$executeRaw`
      INSERT INTO "Region" ("id", "name", "slug", "isActive", "sortOrder")
      VALUES ('region_sochi', 'Сочи', 'sochi', true, 2)
      ON CONFLICT ("slug") DO UPDATE SET
        "name" = EXCLUDED."name",
        "isActive" = EXCLUDED."isActive",
        "sortOrder" = EXCLUDED."sortOrder"
    `;

    let imported = 0;

    for (const item of items) {
      const priceFrom = item.priceFrom ? Number(item.priceFrom) : null;
      const priceTo = item.priceTo ? Number(item.priceTo) : null;
      const areaFrom = item.areaFrom ? Number(item.areaFrom) : null;
      const areaTo = item.areaTo ? Number(item.areaTo) : null;

      await this.prisma.$executeRaw`
        INSERT INTO "Property" (
          "id", "regionId", "title", "slug", "city", "address", "priceFrom", "priceTo", "currency",
          "areaFrom", "areaTo", "propertyType", "status", "description", "purchaseOptionsJson", "isActive", "createdAt", "updatedAt"
        ) VALUES (
          ${item.id}, 'region_sochi', ${item.title}, ${item.slug}, ${item.city || 'Сочи'}, ${item.address}, ${priceFrom}, ${priceTo}, 'RUB',
          ${areaFrom}, ${areaTo}, 'apartment', 'active', ${item.description || ''}, '[]'::jsonb, true, NOW(), NOW()
        )
        ON CONFLICT ("slug") DO UPDATE SET
          "title" = EXCLUDED."title",
          "city" = EXCLUDED."city",
          "address" = EXCLUDED."address",
          "priceFrom" = EXCLUDED."priceFrom",
          "priceTo" = EXCLUDED."priceTo",
          "currency" = EXCLUDED."currency",
          "areaFrom" = EXCLUDED."areaFrom",
          "areaTo" = EXCLUDED."areaTo",
          "propertyType" = EXCLUDED."propertyType",
          "status" = EXCLUDED."status",
          "description" = EXCLUDED."description",
          "purchaseOptionsJson" = EXCLUDED."purchaseOptionsJson",
          "isActive" = EXCLUDED."isActive",
          "updatedAt" = NOW()
      `;

      await this.prisma.$executeRaw`
        DELETE FROM "PropertyMedia" WHERE "propertyId" = ${item.id}
      `;

      for (let i = 0; i < item.media.length; i += 1) {
        await this.prisma.$executeRaw`
          INSERT INTO "PropertyMedia" ("id", "propertyId", "mediaType", "url", "sortOrder", "createdAt")
          VALUES (${`media_${item.id}_${i + 1}`}, ${item.id}, 'image', ${item.media[i]}, ${i + 1}, NOW())
        `;
      }

      imported += 1;
    }

    const countRows = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*)::bigint AS count FROM "Property" WHERE "regionId" = 'region_sochi'
    `;

    return {
      imported,
      totalSochiProperties: Number(countRows[0]?.count ?? 0),
    };
  }
}
