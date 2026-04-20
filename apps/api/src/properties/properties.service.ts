import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const MARKET_ASSETS = {
  crimea: {
    cover: '/market/crimea-cover.jpg',
    gallery: ['/market/crimea-cover.jpg', '/market/crimea-gallery-1.jpg', '/market/crimea-gallery-2.jpg'],
  },
  sochi: {
    cover: '/market/sochi-cover.jpg',
    gallery: ['/market/sochi-cover.jpg', '/market/sochi-gallery-1.jpg', '/market/sochi-gallery-2.jpg'],
  },
} as const;

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(regionSlug?: string, budgetMin?: string, budgetMax?: string) {
    const min = budgetMin ? Number(budgetMin) : undefined;
    const max = budgetMax ? Number(budgetMax) : undefined;

    const priceFilter =
      Number.isFinite(min) && Number.isFinite(max)
        ? { gte: min, lte: max }
        : Number.isFinite(min)
          ? { gte: min }
          : Number.isFinite(max)
            ? { lte: max }
            : undefined;

    const items = await this.prisma.property.findMany({
      where: {
        isActive: true,
        status: 'active',
        ...(regionSlug ? { region: { slug: regionSlug } } : { region: { slug: { in: ['crimea', 'sochi'] } } }),
        ...(priceFilter ? { priceFrom: priceFilter } : {}),
      },
      orderBy: [{ region: { sortOrder: 'asc' } }, { priceFrom: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        slug: true,
        city: true,
        priceFrom: true,
        currency: true,
        region: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return {
      items: items.map((item) => ({
        ...item,
        coverAsset: MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.cover ?? null,
      })),
    };
  }

  async findBySlug(slug: string) {
    const item = await this.prisma.property.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        city: true,
        address: true,
        priceFrom: true,
        priceTo: true,
        currency: true,
        areaFrom: true,
        areaTo: true,
        propertyType: true,
        status: true,
        description: true,
        purchaseOptionsJson: true,
        region: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        metrics: {
          select: {
            rentalYield: true,
            shortTermYield: true,
            annualGrowth: true,
            roi5y: true,
            roi10y: true,
            alternativeTotal: true,
          },
        },
      },
    });

    if (!item || item.status !== 'active') {
      throw new NotFoundException('Property not found');
    }

    return {
      item: {
        ...item,
        coverAsset: MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.cover ?? null,
        galleryAssets: MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.gallery ?? [],
      },
    };
  }
}
