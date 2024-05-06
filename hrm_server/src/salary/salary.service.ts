import { Injectable, Body } from '@nestjs/common';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Salary } from './entities/salary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaryService {
  constructor(@InjectRepository (Salary) private readonly salary: Repository<Salary>){}

  async create(requestBody: any) {
    const { e_id, e_section, e_grade, base_salary, performance, bonus, fine, fine_reason, date, time } = requestBody;
    // 绩效工资
    const performanceSalary = base_salary * performance/100
    const salaryRecord = this.salary.create({
      e_id,e_section,e_grade,base_salary,bonus,fine,fine_reason,date,time,
      performance_salary: performanceSalary,
      paid_salary: base_salary + bonus + performanceSalary,
      actual_salary: base_salary + bonus + performanceSalary - fine
    })
    try {
      await this.salary.save(salaryRecord);
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

  findAll() {
    return this.salary.find();
  }
  // 按照工号查询
  findOne(id: number) {
    return this.salary.find({
      where: {
        e_id: id
      },
    });
  }

  // update(id: number, updateSalaryDto: UpdateSalaryDto) {
  //   return `This action updates a #${id} salary`;
  // }

  remove(id: number) {
    try {
      this.salary.delete(id);
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
