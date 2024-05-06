import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { makeSalt, encryptPassword } from '../utils/cryptogram';


@Injectable()
export class EmployeeService {
  // 实体类Employee注入
  constructor (@InjectRepository(Employee) private readonly employee:Repository<Employee>){}
  // create(createEmployeeDto: CreateEmployeeDto) {
  //   return 'This action adds a new employee';
  // }

  // 查询所有员工信息
  findAll() {
    return this.employee.find();
  }

  // 查询对应员工信息
  async findOne(e_id: number) {
    const data:any = await this.employee.find({
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
  // 查询对应员工的密码和盐
   async findPw(e_id: number) {
    const data:any = await this.employee.find({
      select:['password','salt'],
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

  // 新增员工
  async register(requestBody: any) {
    const { e_id, name, age, sex, e_section, e_grade, e_identification, e_address, e_mail, e_phone, password } = requestBody;
    const emUser = await this.findOne(e_id);
    if (emUser.length > 0) {
      return {
        code: 400,
        msg: '该员工已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const employee = this.employee.create({
      e_id,name,age,sex,e_section,e_grade,e_identification,e_address,e_mail,e_phone,password:hashPwd,salt:salt
    });
    console.log(employee);
    try {
      await this.employee.save(employee);
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

  // 更新员工信息
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      console.log(`员工 ${id} 更新成功`);
      this.employee.update(id, updateEmployeeDto);
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

  // 员工修改密码
  async updatePw(id: number, updateEmployeeDto: any) {
    const oldUser = await this.findPw(id);
    const { oldPw, newPw } = updateEmployeeDto;
    const hashPwd = encryptPassword(oldPw, oldUser[0].salt);  // 加密密码
    if (hashPwd === oldUser[0].password) {
      const newEnPw = encryptPassword(newPw, oldUser[0].salt);
      // console.log(newEnPw);
      const updateEmployeeDto = {
        password: newEnPw,
      }
      // console.log(updateEmployeeDto);
      try {
        console.log(`员工 ${id} 更新密码成功`);
        this.employee.update(id, updateEmployeeDto);
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
  }

  // 重置员工密码
  async resetPw(id: number, updateEmployeeDto: any) {
    const oldUser = await this.findPw(id);
    const { newPw } = updateEmployeeDto;
    if (newPw) {
      const newEnPw = encryptPassword(newPw, oldUser[0].salt);
      const updateEmployeeDto = {
        password: newEnPw,
      }
      try {
        console.log(`员工 ${id} 重置密码成功`);
        this.employee.update(id, updateEmployeeDto);
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
  }
  // 删除员工
  remove(id: number) {
    try {
      console.log(`员工 ${id} 删除成功`);
      this.employee.delete(id);
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
}
