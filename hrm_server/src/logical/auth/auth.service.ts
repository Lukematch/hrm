// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { ELoginService } from '../../e_login/e_login.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';
import { Employee } from '../../employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly eLoginService: ELoginService,
    private readonly jwtService: JwtService
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(e_id: number, password: string): Promise<any> {
    // console.log('JWT验证 - Step 2: 校验用户信息');
    const employee:Employee= await this.eLoginService.emLogin(e_id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (employee.length > 0) {
      // console.log(employee);
      const hashedPassword = employee[0].password;
      const salt = employee[0].salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword == hashPassword) {
        // 密码正确
        return {
          code: 1,
          employee
        };
      } else {
        // 密码错误
        return {
          code: 2,
          employee: null
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      employee: null
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(employee: any) {
    const payload = { e_id: employee.e_id, name: employee.name };
    // console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      console.log(employee.e_id + ' 已登录');
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
