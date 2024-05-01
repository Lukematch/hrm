// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { ELoginService } from '../../e_login/e_login.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { RLoginService } from 'src/r_login/r_login.service';
import { Root } from 'src/root/entities/root.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly rLoginService: RLoginService,
    private readonly jwtService: JwtService
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    // console.log('JWT验证 - Step 2: 校验用户信息');
    const root:Root= await this.rLoginService.rootLogin(username);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (root.length > 0) {
      // console.log(employee);
      const hashedPassword = root[0].password;
      const salt = root[0].salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword == hashPassword) {
        // 密码正确
        return {
          code: 1,
          root
        };
      } else {
        // 密码错误
        return {
          code: 2,
          root: null
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      root: null
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(root: any) {
    const payload = { username: root.username, r_id: root.r_id };
    // console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      console.log(root.username + ' 已登录');
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        code: 600,
        msg: `未知错误`,
      };
    }
  }
}
