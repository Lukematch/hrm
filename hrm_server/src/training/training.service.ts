import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TrainingService {
  constructor(@InjectRepository(Training) private readonly training: Repository<Training>){}

  create(body: any) {
    try {
      this.training.save(body);
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
    return this.training.find({
      where:{
        train_status: In(['体会待考核','培训通过','培训驳回'])
      }
    });
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} training`;
  // }
  // 根据员工工号查询
  findByeId(e_id: number) {
    return this.training.find({
      where: {
        e_id: e_id
      }
    });
  }
  // update(id: number, updateTrainingDto: UpdateTrainingDto) {
  //   return `This action updates a #${id} training`;
  // }
  updateExperience(id: number, body: any){
    try {
      this.training.update(id, body);
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
  updateStatus(id: number, body: any){
    console.log(body);
    try {
      this.training.update(id, body);
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

  remove(id: number) {
    try {
      this.training.delete(id);
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
