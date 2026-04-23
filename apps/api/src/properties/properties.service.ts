import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const MARKET_ASSETS = {
  anapa: {
    cover: '/market/anapa-cover.jpg',
    gallery: ['/market/anapa-cover.jpg'],
  },
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
        ...(regionSlug ? { region: { slug: regionSlug } } : { region: { slug: { in: ['anapa', 'crimea', 'sochi'] } } }),
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
        media: {
          select: {
            url: true,
          },
          orderBy: {
            sortOrder: 'asc',
          },
          take: 1,
        },
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
        id: item.id,
        title: item.title,
        slug: item.slug,
        city: item.city,
        priceFrom: item.priceFrom,
        currency: item.currency,
        region: item.region,
        coverAsset: item.media[0]?.url ?? MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.cover ?? null,
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
        media: {
          select: {
            url: true,
          },
          orderBy: {
            sortOrder: 'asc',
          },
        },
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

    const galleryAssets = item.media.map((media) => media.url);

    return {
      item: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        city: item.city,
        address: item.address,
        priceFrom: item.priceFrom,
        priceTo: item.priceTo,
        currency: item.currency,
        areaFrom: item.areaFrom,
        areaTo: item.areaTo,
        propertyType: item.propertyType,
        status: item.status,
        description: item.description,
        purchaseOptionsJson: item.purchaseOptionsJson,
        region: item.region,
        metrics: item.metrics,
        coverAsset: galleryAssets[0] ?? MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.cover ?? null,
        galleryAssets: galleryAssets.length ? galleryAssets : MARKET_ASSETS[item.region.slug as keyof typeof MARKET_ASSETS]?.gallery ?? [],
      },
    };
  }
}
