import { Injectable } from '@nestjs/common';
import { CreateDimissionApplyDto } from './dto/create-dimission_apply.dto';
import { UpdateDimissionApplyDto } from './dto/update-dimission_apply.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DimissionApply } from './entities/dimission_apply.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DimissionApplyService {
  constructor(@InjectRepository(DimissionApply) private readonly dimissionApply:Repository<DimissionApply>) {}

  // 创建通告
  async create(body: any) {
    try {
      await this.dimissionApply.save(body);
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
    return this.dimissionApply.find();
  }

  find(id: number) {
    return this.dimissionApply.find({
      where: {
        e_id: id
      },
    });
  }

  async update(id: number, body: any) {
    try {
      await this.dimissionApply.update(id, body);
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
      await this.dimissionApply.delete(id);
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
