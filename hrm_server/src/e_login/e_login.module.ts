import { Module } from '@nestjs/common';
import { ELoginService } from './e_login.service';
import { ELoginController } from './e_login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { AuthModule } from 'src/logical/auth/auth.module';
import { AuthService } from 'src/logical/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/logical/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    ELoginModule,
    EmployeeModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15min' }, // token 过期时效
    }),
  ],
  controllers: [ELoginController],
  providers: [
    ELoginService,
    EmployeeService,
    AuthService
  ]
})
export class ELoginModule {}
