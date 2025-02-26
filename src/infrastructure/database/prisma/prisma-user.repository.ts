import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../../application/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { Role } from 'src/domain/entities/role.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(
      user.id,
      user.email,
      user.password,
      user.roles.map((role) => ({ id: '', name: role as Role['name'] })),
      user.name || '',
      user.licenseNumber || '',
      user.modelPreferences || [],
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(
      user.id,
      user.email,
      user.password,
      user.roles.map((role) => ({ id: '', name: role as Role['name'] })),
      user.name || '',
      user.licenseNumber || '',
      user.modelPreferences || [],
    );
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        password: user.password,
        roles: user.roles.map((role) => role.name),
        name: user.name,
        licenseNumber: user.licenseNumber,
        modelPreferences: user.modelPreferences,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        roles: user.roles.map((role) => role.name),
        name: user.name,
        licenseNumber: user.licenseNumber,
        modelPreferences: user.modelPreferences,
      },
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        licenseNumber: user.licenseNumber,
        modelPreferences: user.modelPreferences,
      },
    });
  }
}
