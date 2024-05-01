import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(@InjectRepository(Notice) private readonly notice:Repository<Notice>) {}

  // 创建通告
  async create(requestBody: any) {
    const { notice_id, notice_topic, notice_title, content, note, send_time, sender } = requestBody;
    const notice = this.notice.create({
      notice_id,notice_topic,notice_title,content,note,send_time,sender
    })
    console.log(`通告 ${notice_id} 创建成功`);
    try {
      await this.notice.save(notice);
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  // 获取通告列表
  findAll() {
    return this.notice.find();
  }

  // 编辑某一条通告
  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    console.log(`通告 ${id} 更新成功`);
    return this.notice.update(id, updateNoticeDto);
  }

  // 删除某一条通告
  remove(id: number) {
    try {
      console.log(`通告 ${id} 删除成功`);
      this.notice.delete(id);
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
