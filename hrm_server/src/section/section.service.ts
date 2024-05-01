import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  // 注入Section类，对其进行数据库操作
  constructor(@InjectRepository(Section) private readonly section: Repository<Section>){}
  // 创建部门
  async create(body: any) {
    try {
      await this.section.save(body);
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
  // 查询部门列表
  findAll() {
    return this.section.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} section`;
  // }

  update(id: string, updateSectionDto: UpdateSectionDto) {
    return this.section.update(id, updateSectionDto);
  }

  remove(id: string) {
    return this.section.delete(id);
  }
}
