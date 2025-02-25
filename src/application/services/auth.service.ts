/* eslint-disable @typescript-eslint/require-await */
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
