import { Injectable } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Command } from './entities/command.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommandService {
  constructor(@InjectRepository(Command) private readonly command:Repository<Command>) {}

  async create(body: any) {
    try {
      await this.command.save(body);
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
    return this.command.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} command`;
  // }

  // update(id: number, updateCommandDto: UpdateCommandDto) {
  //   return `This action updates a #${id} command`;
  // }

  remove(id: number) {
    try {
      this.command.delete(id);
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
