import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const session = await this.prisma.session.findUnique({
      where: { id: dto.sessionId },
      select: { id: true, userId: true },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const property = dto.propertySlug
      ? await this.prisma.property.findUnique({
          where: { slug: dto.propertySlug },
          select: { id: true, slug: true, title: true },
        })
      : null;

    const lead = await this.prisma.lead.create({
      data: {
        userId: session.userId,
        sessionId: session.id,
        phone: dto.phone,
        regionInterest: dto.regionInterest,
        budgetRange: dto.budgetRange,
        purchaseTerm: dto.purchaseTerm,
        source: dto.source,
      },
      select: {
        id: true,
        phone: true,
        status: true,
        createdAt: true,
      },
    });

    if (property) {
      await this.prisma.application.create({
        data: {
          leadId: lead.id,
          propertyId: property.id,
          applicationType: 'PROPERTY_REQUEST',
          comment: `Lead created from miniapp for property ${property.slug}`,
        },
      });
    }

    return {
      item: {
        ...lead,
        property: property
          ? {
              id: property.id,
              slug: property.slug,
              title: property.title,
            }
          : null,
      },
    };
  }

  getHealth() {
    return { module: 'leads', status: 'ok' };
  }
}
