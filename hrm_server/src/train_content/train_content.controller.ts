import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainContentService } from './train_content.service';
import { CreateTrainContentDto } from './dto/create-train_content.dto';
import { UpdateTrainContentDto } from './dto/update-train_content.dto';

@Controller('/api/train-content')
export class TrainContentController {
  constructor(private readonly trainContentService: TrainContentService) {}

  @Post()
  create(@Body() body: any) {
    return this.trainContentService.create(body);
  }

  @Get()
  findAll() {
    return this.trainContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainContentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.trainContentService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainContentService.remove(id);
  }
}
