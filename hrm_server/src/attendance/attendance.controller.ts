import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('/api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // 创建考勤数据
  @Post()
  create(@Body() body: any) {
    return this.attendanceService.create(body);
  }

  // 查询所有考勤数据
  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  // 按照工号查询对于考勤数据
  @Get(':id/id')
  findOne(@Param('id') id: number) {
    return this.attendanceService.findOne(id);
  }

  // 按照日期查找数据
  @Get(':date/date')
  findByDate(@Param('date') date: string) {
    return this.attendanceService.findByDate(date);
  }
  // 按照月份查找数据
  @Get(':month/month')
  findByMonth(@Param('month') month: string) {
    return this.attendanceService.findByMonth(month);
  }
  // 按照工号 日期查找数据
  @Get(':id/:date')
  findOneByDate(@Param('id') id: number, @Param('date') date: string) {
    return this.attendanceService.findOneByDate(id, date);
  }
  // 按照部门查找数据
  @Get(':section/section')
  findBySection(@Param('section') section: string) {
    return this.attendanceService.findBySection(section);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() body: any) {
  //   return this.attendanceService.update(id, body);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.attendanceService.remove(+id);
  // }
}
