import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const items = await this.prisma.region.findMany({
      where: {
        isActive: true,
        slug: {
          in: ['anapa', 'crimea', 'sochi'],
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      select: {
        id: true,
        name: true,
        slug: true,
        sortOrder: true,
      },
    });

    return { items };
  }
}
