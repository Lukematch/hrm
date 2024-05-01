import { Injectable } from '@nestjs/common';
import { CreateTrainContentDto } from './dto/create-train_content.dto';
import { UpdateTrainContentDto } from './dto/update-train_content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainContent } from './entities/train_content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainContentService {
  constructor(@InjectRepository(TrainContent) private readonly trainContent: Repository<TrainContent>) {}

  create(body: any) {
    try {
      this.trainContent.save(body);
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
    return this.trainContent.find()
  }

  findOne(id: string) {
    return this.trainContent.find({
      where:{
        train_id: id
      }
    })
  }

  update(id: string, body: any) {
    try {
      this.trainContent.update(id, body);
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

  remove(id: string) {
    try {
      this.trainContent.delete(id);
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
