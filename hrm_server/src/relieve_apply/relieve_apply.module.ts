import { Module } from '@nestjs/common';
import { RelieveApplyService } from './relieve_apply.service';
import { RelieveApplyController } from './relieve_apply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelieveApply } from './entities/relieve_apply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelieveApply])],
  controllers: [RelieveApplyController],
  providers: [RelieveApplyService],
})
export class RelieveApplyModule {}
