/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public roles: Role[],
    public name: string,
    public licenseNumber: string,
    public modelPreferences: string[],
  ) {}

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
