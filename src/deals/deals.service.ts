import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './entities/deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async create(createDealDto: CreateDealDto): Promise<Deal> {
    const { ownerId, customerId, companyId, ...dealData } = createDealDto;

    const deal = this.dealRepository.create({
      ...dealData,
      owner: { id: ownerId },
      customer: { id: customerId },
      company: { id: companyId },
    });

    return this.dealRepository.save(deal);
  }

  findAll(): Promise<Deal[]> {
    return this.dealRepository.find();
  }

  async findOne(id: number): Promise<Deal> {
    const deal = await this.dealRepository.findOneBy({ id });
    if (!deal) {
      throw new NotFoundException(`Deal with ID "${id}" not found`);
    }
    return deal;
  }

  async update(id: number, updateDealDto: UpdateDealDto): Promise<Deal> {
    const { ownerId, customerId, companyId, ...dealData } = updateDealDto;
    
    const updatePayload = {
        ...dealData,
        ...(ownerId && { owner: { id: ownerId } }),
        ...(customerId && { customer: { id: customerId } }),
        ...(companyId && { company: { id: companyId } }),
    };

    const deal = await this.dealRepository.preload({ id, ...updatePayload });

    if (!deal) {
      throw new NotFoundException(`Deal with ID "${id}" not found`);
    }

    return this.dealRepository.save(deal);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dealRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Deal with ID "${id}" not found`);
    }
  }

  async searchDeals(keyword: string): Promise<Deal[]> {
    return this.dealRepository.createQueryBuilder('deal')
      .where('deal.title ILIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }
}
