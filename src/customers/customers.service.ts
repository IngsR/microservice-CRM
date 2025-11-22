import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { companyId, ...customerData } = createCustomerDto;
    const customer = this.customerRepository.create({
      ...customerData,
      ...(companyId && { company: { id: companyId } }),
    });
    return this.customerRepository.save(customer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const { companyId, ...customerData } = updateCustomerDto;
    const customer = await this.findOne(id);

    const preloadPayload = {
      ...customer,
      ...customerData,
    };

    if (companyId) {
      preloadPayload.company = { id: companyId } as Company;
    }

    const preloadedCustomer = await this.customerRepository.preload(preloadPayload);

    if (!preloadedCustomer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }

    return this.customerRepository.save(preloadedCustomer);
  }

  async remove(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
  }

  async searchCustomers(keyword: string): Promise<Customer[]> {
    return this.customerRepository.createQueryBuilder('customer')
      .where('customer.firstName ILIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('customer.lastName ILIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('customer.email ILIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }
}

