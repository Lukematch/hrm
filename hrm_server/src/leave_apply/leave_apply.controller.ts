import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveApplyService } from './leave_apply.service';
import { CreateLeaveApplyDto } from './dto/create-leave_apply.dto';
import { UpdateLeaveApplyDto } from './dto/update-leave_apply.dto';

@Controller('/api/leave-apply')
export class LeaveApplyController {
  constructor(private readonly leaveApplyService: LeaveApplyService) {}
  // 创建请假申请实体
  @Post()
  create(@Body() body: any) {
    return this.leaveApplyService.create(body);
  }
  // 获取所有请假申请 列表
  @Get()
  findAll() {
    return this.leaveApplyService.findAll();
  }
  // 根据工号e_id获取请假申请 列表
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.leaveApplyService.findOne(id);
  }
  // 修改
  // 通过 驳回
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.leaveApplyService.update(id, body);
  }

  // 删除
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.leaveApplyService.remove(id);
  }
}
