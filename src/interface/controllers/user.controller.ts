import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { UserRepository } from '../../application/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  @Post()
  async createUser(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      licenseNumber: string;
      modelPreferences: string[];
    },
  ): Promise<void> {
    const user = new User(
      crypto.randomUUID(),
      body.email,
      '',
      [],
      body.name,
      body.licenseNumber,
      body.modelPreferences,
    );
    await user.setPassword(body.password);
    await this.userRepository.save(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    body: { name: string; licenseNumber: string; modelPreferences: string[] },
  ): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    user.name = body.name;
    user.licenseNumber = body.licenseNumber;
    user.modelPreferences = body.modelPreferences;

    await this.userRepository.update(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
