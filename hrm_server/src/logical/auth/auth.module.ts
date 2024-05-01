// src/logical/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ELoginService } from 'src/e_login/e_login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15min' }, // token 过期时效
    }),
    TypeOrmModule.forFeature([Employee])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ELoginService],
  exports: [AuthService],
})
export class AuthModule {}
