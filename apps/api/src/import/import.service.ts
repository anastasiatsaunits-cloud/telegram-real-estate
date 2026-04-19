import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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
  regionId?: string;
};

const REGION_MAP: Record<string, { id: string; name: string; slug: string; sortOrder: number }> = {
  region_sochi: { id: 'region_sochi', name: 'Сочи', slug: 'sochi', sortOrder: 2 },
  region_crimea: { id: 'region_crimea', name: 'Крым', slug: 'crimea', sortOrder: 3 },
};

@Injectable()
export class ImportService {
  private async getClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is missing');
    }

    const client = new Client({
      connectionString,
      ssl: false,
    });

    await client.connect();
    return client;
  }

  async applySchema() {
    const client = await this.getClient();

    try {
      const sqlPath = join(process.cwd(), 'prisma', 'render_init.sql');
      const sql = readFileSync(sqlPath, 'utf8');
      await client.query(sql);
      return { ok: true };
    } finally {
      await client.end();
    }
  }

  async importN93Curated(items: ImportProperty[]) {
    const client = await this.getClient();

    try {
      await client.query('BEGIN');

      for (const region of Object.values(REGION_MAP)) {
        await client.query(
          `INSERT INTO "Region" ("id", "name", "slug", "isActive", "sortOrder")
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT ("slug") DO UPDATE SET
             "name" = EXCLUDED."name",
             "isActive" = EXCLUDED."isActive",
             "sortOrder" = EXCLUDED."sortOrder"`,
          [region.id, region.name, region.slug, true, region.sortOrder],
        );
      }

      let imported = 0;

      for (const item of items) {
        const priceFrom = item.priceFrom ? Number(item.priceFrom) : null;
        const priceTo = item.priceTo ? Number(item.priceTo) : null;
        const areaFrom = item.areaFrom ? Number(item.areaFrom) : null;
        const areaTo = item.areaTo ? Number(item.areaTo) : null;
        const regionId = item.regionId && REGION_MAP[item.regionId] ? item.regionId : item.city === 'Крым' ? 'region_crimea' : 'region_sochi';

        await client.query(
          `INSERT INTO "Property" (
            "id", "regionId", "title", "slug", "city", "address", "priceFrom", "priceTo", "currency",
            "areaFrom", "areaTo", "propertyType", "status", "description", "purchaseOptionsJson", "isActive", "createdAt", "updatedAt"
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, 'RUB',
            $9, $10, 'apartment', 'active', $11, '[]'::jsonb, true, NOW(), NOW()
          )
          ON CONFLICT ("slug") DO UPDATE SET
            "regionId" = EXCLUDED."regionId",
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
            "updatedAt" = NOW()`,
          [
            item.id,
            regionId,
            item.title,
            item.slug,
            item.city || 'Сочи',
            item.address || null,
            priceFrom,
            priceTo,
            areaFrom,
            areaTo,
            item.description || '',
          ],
        );

        await client.query('DELETE FROM "PropertyMedia" WHERE "propertyId" = $1', [item.id]);

        for (let i = 0; i < item.media.length; i += 1) {
          await client.query(
            `INSERT INTO "PropertyMedia" ("id", "propertyId", "mediaType", "url", "sortOrder", "createdAt")
             VALUES ($1, $2, 'image', $3, $4, NOW())`,
            [`media_${item.id}_${i + 1}`, item.id, item.media[i], i + 1],
          );
        }

        imported += 1;
      }

      const totals = await client.query(
        `SELECT r.slug, COUNT(p.*)::int AS count
         FROM "Region" r
         LEFT JOIN "Property" p ON p."regionId" = r.id
         GROUP BY r.slug
         ORDER BY r.slug ASC`,
      );

      await client.query('COMMIT');

      return {
        imported,
        totals: totals.rows,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.end();
    }
  }
}
