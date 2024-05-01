import { Injectable } from '@nestjs/common';
import { CreateRLoginDto } from './dto/create-r_login.dto';
import { UpdateRLoginDto } from './dto/update-r_login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Root } from 'src/root/entities/root.entity';

@Injectable()
export class RLoginService {
  constructor (@InjectRepository(Root) private readonly root:Repository<Root>){}
  async rootLogin(username: string) {
    const data:any = await this.root.find({
      select: ['r_id', 'username', 'password', 'salt'],
      where:{
        username: username
      }
    })
    if(data.length > 0){
      return data;
    } else {
      return {
        code: 400,
        msg: '不存在该管理员'
      }
    }
  }
}
