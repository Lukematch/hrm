import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@Controller('/api/training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  create(@Body() body: any) {
    return this.trainingService.create(body);
  }

  @Get()
  findAll() {
    return this.trainingService.findAll();
  }

  // 根据员工工号查询
  @Get(':id/e_id')
  findOne(@Param('id') id: number) {
    return this.trainingService.findByeId(id);
  }
  // 员工提交培训体会
  @Patch(':id/experience')
  updateExperience(@Param('id') id: number, @Body() body: any) {
    return this.trainingService.updateExperience(id, body);
  }
  // 培训状态 已选中、体会待考核、培训通过、培训驳回
  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() body: any) {
    return this.trainingService.updateStatus(id, body);
  }

  // 删除
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainingService.remove(id);
  }
}
