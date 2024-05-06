import { Module } from '@nestjs/common';
import { DimissionApplyService } from './dimission_apply.service';
import { DimissionApplyController } from './dimission_apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimissionApply } from './entities/dimission_apply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DimissionApply])],
  controllers: [DimissionApplyController],
  providers: [DimissionApplyService],
})
export class DimissionApplyModule {}
