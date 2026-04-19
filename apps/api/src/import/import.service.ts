import { Injectable } from '@nestjs/common';
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
    const region = await this.prisma.region.findFirst({
      where: { slug: 'sochi' },
      select: { id: true },
    });

    if (!region) {
      await this.prisma.region.create({
        data: {
          id: 'region_sochi',
          name: 'Сочи',
          slug: 'sochi',
          isActive: true,
          sortOrder: 2,
        },
      });
    } else if (region.id !== 'region_sochi') {
      await this.prisma.region.update({
        where: { id: region.id },
        data: { name: 'Сочи', isActive: true, sortOrder: 2 },
      });
    }

    let imported = 0;

    for (const item of items) {
      await this.prisma.property.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          city: item.city || 'Сочи',
          address: item.address || null,
          priceFrom: item.priceFrom ? item.priceFrom : null,
          priceTo: item.priceTo ? item.priceTo : null,
          areaFrom: item.areaFrom ? item.areaFrom : null,
          areaTo: item.areaTo ? item.areaTo : null,
          currency: 'RUB',
          propertyType: 'apartment',
          status: 'active',
          description: item.description || '',
          purchaseOptionsJson: [],
          isActive: true,
          regionId: 'region_sochi',
        },
        create: {
          id: item.id,
          title: item.title,
          slug: item.slug,
          city: item.city || 'Сочи',
          address: item.address || null,
          priceFrom: item.priceFrom ? item.priceFrom : null,
          priceTo: item.priceTo ? item.priceTo : null,
          areaFrom: item.areaFrom ? item.areaFrom : null,
          areaTo: item.areaTo ? item.areaTo : null,
          currency: 'RUB',
          propertyType: 'apartment',
          status: 'active',
          description: item.description || '',
          purchaseOptionsJson: [],
          isActive: true,
          regionId: 'region_sochi',
        },
      });

      await this.prisma.propertyMedia.deleteMany({
        where: { propertyId: item.id },
      });

      for (let i = 0; i < item.media.length; i += 1) {
        await this.prisma.propertyMedia.create({
          data: {
            id: `media_${item.id}_${i + 1}`,
            propertyId: item.id,
            mediaType: 'image',
            url: item.media[i],
            sortOrder: i + 1,
          },
        });
      }

      imported += 1;
    }

    return { imported };
  }
}
