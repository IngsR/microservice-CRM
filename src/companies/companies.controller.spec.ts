import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Role } from '../users/entities/user.entity';

// Mock data
const mockCompany = {
  id: 1,
  name: 'Test Corp',
  address: '123 Main St',
  phone: '555-1234',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockUser = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  roles: [Role.ADMIN],
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock service
const mockCompaniesService = {
  create: jest.fn().mockResolvedValue(mockCompany),
  findAll: jest.fn().mockResolvedValue([mockCompany]),
  findOne: jest.fn().mockResolvedValue(mockCompany),
  update: jest.fn().mockResolvedValue(mockCompany),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: mockCompaniesService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const createDto: CreateCompanyDto = {
        name: 'Test Corp',
        address: '123 Main St',
        phone: '555-1234',
      };
      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCompany]);
    });
  });

  describe('findOne', () => {
    it('should return a single company', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('remove', () => {
    it('should remove a company', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
