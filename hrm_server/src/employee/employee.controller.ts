import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('/api/employee')
@ApiTags('员工表接口')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  //新增员工
  @ApiOperation({description:'新增员工'})
  @Post()
  async register(@Body() body: any) {
    return await this.employeeService.register(body);
  }

  // 查询所有员工信息
  @ApiOperation({description:'查询所有员工信息'})
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  // 查询单个员工信息
  @ApiOperation({description:'查询单个员工信息'})
  @ApiParam({name:'e_id',description:'员工工号',required:true})
  @Get(':e_id')
  findOne(@Param('e_id') e_id: number) {
    // console.log(e_id);
    return this.employeeService.findOne(e_id);
  }

  // 查询员工当前加密密码和盐
  @Get(':e_id/pw')
  findOnePw(@Param('e_id') e_id: number) {
    return this.employeeService.findPw(e_id);
  }

  // 更新员工信息
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  // 更新员工密码
  @Patch(':id/pw')
  updatePw(@Param('id') id: number, @Body() body: any) {
    return this.employeeService.updatePw(id, body);
  }
  // 重置员工密码
  @Patch(':id/resetpw')
  resetPw(@Param('id') id: number, @Body() body: any) {
    return this.employeeService.resetPw(id, body);
  }
  // 删除员工信息
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeService.remove(id);
  }
}
