import { Injectable } from '@nestjs/common';
import { CreateLeaveApplyDto } from './dto/create-leave_apply.dto';
import { UpdateLeaveApplyDto } from './dto/update-leave_apply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveApply } from './entities/leave_apply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveApplyService {
  constructor(@InjectRepository(LeaveApply) private readonly leaveApply: Repository<LeaveApply>) {}

  // 创建请假申请
  create(body: any) {
    return this.leaveApply.save(body);
  }

  findAll() {
    return this.leaveApply.find();
  }

  findOne(id: number) {
    return this.leaveApply.find({
      // select: ['e_id','leave_status'],
      where: {
        e_id: id,
      }
    });
  }
  // 更新状态
  update(id: number, body: any) {
    // console.log(id,body);
    const updateLeaveApply = {
      leave_status: body.leave_status,
    }
    try {
      this.leaveApply.update(id, updateLeaveApply);
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

  remove(id: number) {
    return this.leaveApply.delete(id);
  }
}
