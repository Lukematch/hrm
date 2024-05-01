// src/logical/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Root } from 'src/root/entities/root.entity';
import { RLoginService } from 'src/r_login/r_login.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15min' }, // token 过期时效
    }),
    TypeOrmModule.forFeature([Root])
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RLoginService],
  exports: [AuthService],
})
export class AuthModule {}
