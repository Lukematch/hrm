import { Injectable } from '@nestjs/common';
import { CreateRelieveApplyDto } from './dto/create-relieve_apply.dto';
import { UpdateRelieveApplyDto } from './dto/update-relieve_apply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelieveApply } from './entities/relieve_apply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelieveApplyService {
  constructor(@InjectRepository(RelieveApply) private readonly relieveApply:Repository<RelieveApply>) {}

  // 创建通告
  async create(body: any) {
    try {
      await this.relieveApply.save(body);
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
  findAll() {
    return this.relieveApply.find();
  }

  find(id: number) {
    return this.relieveApply.find({
      where: {
        e_id: id
      },
    });
  }

  async update(id: number, body: any) {
    try {
      await this.relieveApply.update(id, body);
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

  async remove(id: number) {
    try {
      await this.relieveApply.delete(id);
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
