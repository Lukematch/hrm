import { Module } from '@nestjs/common';
import { RLoginService } from './r_login.service';
import { RLoginController } from './r_login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/logical/auth2/auth.module';
import { RootModule } from 'src/root/root.module';
import { Root } from 'src/root/entities/root.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/logical/auth2/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Root]),
    RLoginModule,
    RootModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15min' }, // token 过期时效
    }),
  ],
  controllers: [RLoginController],
  providers: [
    RLoginModule,
    RootModule,
    RLoginService
  ],
})
export class RLoginModule {}
