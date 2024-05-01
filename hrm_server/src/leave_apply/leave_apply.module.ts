import { Module } from '@nestjs/common';
import { LeaveApplyService } from './leave_apply.service';
import { LeaveApplyController } from './leave_apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveApply } from './entities/leave_apply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveApply])], // 注册实体,
  controllers: [LeaveApplyController],
  providers: [LeaveApplyService],
})
export class LeaveApplyModule {}
