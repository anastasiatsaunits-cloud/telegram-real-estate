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

      await client.query(
        `INSERT INTO "Region" ("id", "name", "slug", "isActive", "sortOrder")
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT ("slug") DO UPDATE SET
           "name" = EXCLUDED."name",
           "isActive" = EXCLUDED."isActive",
           "sortOrder" = EXCLUDED."sortOrder"`,
        ['region_sochi', 'Сочи', 'sochi', true, 2],
      );

      let imported = 0;

      for (const item of items) {
        const priceFrom = item.priceFrom ? Number(item.priceFrom) : null;
        const priceTo = item.priceTo ? Number(item.priceTo) : null;
        const areaFrom = item.areaFrom ? Number(item.areaFrom) : null;
        const areaTo = item.areaTo ? Number(item.areaTo) : null;

        await client.query(
          `INSERT INTO "Property" (
            "id", "regionId", "title", "slug", "city", "address", "priceFrom", "priceTo", "currency",
            "areaFrom", "areaTo", "propertyType", "status", "description", "purchaseOptionsJson", "isActive", "createdAt", "updatedAt"
          ) VALUES (
            $1, 'region_sochi', $2, $3, $4, $5, $6, $7, 'RUB',
            $8, $9, 'apartment', 'active', $10, '[]'::jsonb, true, NOW(), NOW()
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
            "updatedAt" = NOW()`,
          [
            item.id,
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

      const countRes = await client.query(
        'SELECT COUNT(*)::int AS count FROM "Property" WHERE "regionId" = $1',
        ['region_sochi'],
      );

      await client.query('COMMIT');

      return {
        imported,
        totalSochiProperties: countRes.rows[0]?.count ?? 0,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.end();
    }
  }
}
