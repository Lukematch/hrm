// src/logical/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(e_id: number, password: string): Promise<any> {
    const employee = await this.authService.validateUser(e_id, password);
    if (!employee) {
      throw new UnauthorizedException();
    }
    return employee;
  }
}
