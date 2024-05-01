import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RootService } from './root.service';
import { CreateRootDto } from './dto/create-root.dto';
import { UpdateRootDto } from './dto/update-root.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/api/root')
@ApiTags('管理员表接口')
export class RootController {
  constructor(private readonly rootService: RootService) {}
  //新增管理员
  @ApiOperation({description:'新增管理员'})
  @Post()
  async register(@Body() body: any) {
    return await this.rootService.register(body);
  }

  @ApiOperation({description:'查询管理员个人信息'})
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.rootService.findOne(username);
  }

}
