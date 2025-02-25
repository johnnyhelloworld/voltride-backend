/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { JwtAuthGuard } from '../../application/guards/jwt-auth.guard';
import { UserRepository } from '../../application/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
  ): Promise<void> {
    const user = new User(crypto.randomUUID(), body.email, '', [], '', '', []);
    await user.setPassword(body.password);
    await this.userRepository.save(user);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
