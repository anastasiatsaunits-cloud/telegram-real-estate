import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const items = await this.prisma.property.findMany({
      where: { isActive: true },
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
}
