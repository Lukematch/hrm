import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';

@Controller('/api/salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  create(@Body() body: any) {
    return this.salaryService.create(body);
  }

  @Get()
  findAll() {
    return this.salaryService.findAll();
  }
  // 按照工号查询
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.salaryService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalaryDto: UpdateSalaryDto) {
  //   return this.salaryService.update(+id, updateSalaryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.salaryService.remove(id);
  }
}
