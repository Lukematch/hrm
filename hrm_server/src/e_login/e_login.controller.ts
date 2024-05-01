import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { ELoginService } from './e_login.service';
import { CreateELoginDto } from './dto/create-e_login.dto';
import { UpdateELoginDto } from './dto/update-e_login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/logical/auth/auth.service';
import { EmployeeService } from '../employee/employee.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/e-login')
@ApiTags('员工登录接口 /e-login')
export class ELoginController {
  constructor(
    // private readonly eLoginService: ELoginService,
    private readonly authService: AuthService,
    // private readonly employeeService: EmployeeService
  ) {}
  // @Get(':e_id')
  // emLogin(@Param('e_id') e_id: number, @Session() session) {
  //   return this.eLoginService.emLogin(e_id);
  // }
  // JWT验证 - Step 1: 用户请求登录
  // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() loginParmas: any) {
    const authResult = await this.authService.validateUser(loginParmas.e_id, loginParmas.password);
    // console.log(authResult);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.employee[0]);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }
}
