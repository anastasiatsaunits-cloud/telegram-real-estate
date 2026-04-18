import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(regionSlug?: string, budgetMin?: string, budgetMax?: string) {
    const min = budgetMin ? Number(budgetMin) : undefined;
    const max = budgetMax ? Number(budgetMax) : undefined;

    const items = await this.prisma.property.findMany({
      where: {
        isActive: true,
        ...(regionSlug ? { region: { slug: regionSlug } } : {}),
        ...(Number.isFinite(min) ? { priceFrom: { gte: min } } : {}),
        ...(Number.isFinite(max) ? { priceFrom: { lte: max } } : {}),
      },
      orderBy: { createdAt: 'desc' },
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

    return { items };
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

    return { item };
  }
}
