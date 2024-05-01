import { Injectable } from '@nestjs/common';
import { CreateELoginDto } from './dto/create-e_login.dto';
import { UpdateELoginDto } from './dto/update-e_login.dto';
import { Employee } from '../employee/entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ELoginService {
  constructor (@InjectRepository(Employee) private readonly employee:Repository<Employee>){}
  async emLogin(e_id: number) {
    const data:any = await this.employee.find({
      select: ['e_id', 'password', 'name', 'salt'],
      where:{
        e_id: e_id
      }
    })
    if(data.length > 0){
      return data;
    } else {
      return {
        code: 400,
        msg: '不存在该员工'
      }
    }
  }
}
