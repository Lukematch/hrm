import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DimissionApplyService } from './dimission_apply.service';
import { CreateDimissionApplyDto } from './dto/create-dimission_apply.dto';
import { UpdateDimissionApplyDto } from './dto/update-dimission_apply.dto';

@Controller('/api/dimission-apply')
export class DimissionApplyController {
  constructor(private readonly dimissionApplyService: DimissionApplyService) {}

  @Post()
  create(@Body() body: any) {
    return this.dimissionApplyService.create(body);
  }

  @Get()
  findAll() {
    return this.dimissionApplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dimissionApplyService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.dimissionApplyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dimissionApplyService.remove(id);
  }
}
