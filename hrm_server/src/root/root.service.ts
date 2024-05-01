import { Injectable } from '@nestjs/common';
import { CreateRootDto } from './dto/create-root.dto';
import { UpdateRootDto } from './dto/update-root.dto';
import { makeSalt, encryptPassword } from '../utils/cryptogram';
import { Root } from './entities/root.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RootService {
  constructor (@InjectRepository(Root) private readonly root:Repository<Root>){}
    // 查询管理员个人信息
    async findOne(username: string) {
      const data:any = await this.root.find({
        where:{
          username: username
        }
      })
      if(data.length > 0){
        return data;
      } else {
        return {
          code: 400,
          msg: '不存在该账号'
        }
      }
    }

    // 新增管理员账号
    async register(requestBody: any) {
      const { r_id, avatar, username, password } = requestBody;
      const emUser = await this.findOne(username);
      if (emUser.length > 0) {
        return {
          code: 400,
          msg: '该账号已存在',
        };
      }
      const salt = makeSalt(); // 制作密码盐
      const hashPwd = encryptPassword(password, salt);  // 加密密码
      const root = this.root.create({
        r_id,
        avatar,
        username,
        password:hashPwd,
        salt:salt
      });
      console.log(root);
      try {
        await this.root.save(root);
        return {
          code: 200,
          msg: 'success',
        };
      } catch (error) {
        return {
          code: 503,
          msg: `Service error: ${error}`,
        };
      }
    }

  // update(id: number, updateRootDto: UpdateRootDto) {
  //   return `This action updates a #${id} root`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} root`;
  // }
}
