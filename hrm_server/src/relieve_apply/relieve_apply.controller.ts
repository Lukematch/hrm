import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelieveApplyService } from './relieve_apply.service';
import { CreateRelieveApplyDto } from './dto/create-relieve_apply.dto';
import { UpdateRelieveApplyDto } from './dto/update-relieve_apply.dto';

@Controller('/api/relieve-apply')
export class RelieveApplyController {
  constructor(private readonly relieveApplyService: RelieveApplyService) {}

  @Post()
  create(@Body() createRelieveApplyDto: CreateRelieveApplyDto) {
    return this.relieveApplyService.create(createRelieveApplyDto);
  }

  @Get()
  findAll() {
    return this.relieveApplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.relieveApplyService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.relieveApplyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.relieveApplyService.remove(id);
  }
}
