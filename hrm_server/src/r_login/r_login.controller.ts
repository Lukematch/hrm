import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RLoginService } from './r_login.service';
import { CreateRLoginDto } from './dto/create-r_login.dto';
import { UpdateRLoginDto } from './dto/update-r_login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RootService } from '../root/root.service';
import { AuthService } from 'src/logical/auth2/auth.service';

@Controller('/api/r-login')
@ApiTags('管理员登录接口 /r-login')
export class RLoginController {
  constructor(
    // private readonly rootService: RootService,
    private readonly authService: AuthService,
    // private readonly rLoginService: RLoginService
  ) {}
  @Post('login')
  async login(@Body() loginParmas: any) {
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    // console.log(authResult);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.root[0]);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `不存在此管理员`,
        };
    }
  }

}
