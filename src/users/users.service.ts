import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password_hash'>> {
    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = this.userRepository.create({ ...createUserDto, password_hash });
    const savedUser = await this.userRepository.save(newUser);

    const { password_hash: _, ...result } = savedUser;
    return result;
  }

  async findAll(): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.userRepository.find();
    return users.map(user => {
      const { password_hash, ...result } = user;
      return result;
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password_hash'>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const { password_hash, ...result } = user;
    return result;
  }

  // This is for internal use by the auth module later
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password_hash'>> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async searchUsers(keyword: string): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.userRepository.createQueryBuilder('user')
      .where('user.firstName ILIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.lastName ILIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('user.email ILIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
    
    return users.map(user => {
      const { password_hash, ...result } = user;
      return result;
    });
  }
}
