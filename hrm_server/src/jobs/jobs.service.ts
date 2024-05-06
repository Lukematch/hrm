import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Job) private readonly job:Repository<Job>) {}

  // 创建工作项
  async create(body: any) {
    try {
      await this.job.save(body);
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
  // 获取工作项列表
  findAll() {
    return this.job.find();
  }

  // 根据工号获取工作项列表
  find(id: number) {
    return this.job.find({
      where: {
        e_id: id
      }
    })
  }

  // 编辑某一条工作项
  update(id: number, body: any) {
    try {
      this.job.update(id, body);
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

  // 删除某一条工作项
  remove(id: number) {
    try {
      this.job.delete(id);
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
