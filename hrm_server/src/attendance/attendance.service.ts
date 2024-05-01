import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(@InjectRepository(Attendance) private readonly attendance :Repository<Attendance>) {}

  // 前台 签到签退 插入考勤数据
  async create(body: any) {
    try {
      await this.attendance.save(body);
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

  // 查找所有数据
  findAll() {
    return this.attendance.find();
  }
  // 按照工号查找数据
  findOne(id: number) {
    return this.attendance.find({
      where:{
        e_id: id
      }
    });
  }

  // 按照日期查找数据
  findByDate(date: string){
    return this.attendance.find({
      where:{
        attendance_date: date
      }}
    )
  }
  // 按照月份查询数据
  async findByMonth(month: string){
    const [year, monthStr] = month.split('-');
    const monthDate = new Date(Number(year), Number(monthStr) - 1);

    const firstDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const lastDayOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

    return await this.attendance.find({
      where: {
        attendance_date: Between(firstDayOfMonth.toISOString(), lastDayOfMonth.toISOString()),
      },
    });
  }
  // 按照工号 日期查找数据
  findOneByDate(id: number, date: string){
    return this.attendance.find({
      where:{
        e_id: id,
        attendance_date: date
      }}
    )
  }
  // 按照部门查找数据
  findBySection(section: string) {
    return this.attendance.find({
      where:{
        e_section: section
      }
    })
  }

  // update(id: number, body: any) {

  // }

  // remove(id: number) {
  //   return `This action removes a #${id} attendance`;
  // }
}
