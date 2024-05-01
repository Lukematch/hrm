import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Controller('/api/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}
  // 新增通告
  @Post()
  async create(@Body() body: any) {
    return await this.noticeService.create(body);
  }
  // 获取通告列表
  @Get()
  findAll() {
    return this.noticeService.findAll();
  }
  // 修改通告
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  // 删除通告
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.noticeService.remove(id);
  }
}
