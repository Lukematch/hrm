import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private readonly feedback:Repository<Feedback>) {}

  async create(body: any) {
    try {
      await this.feedback.save(body);
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
    return this.feedback.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} feedback`;
  // }

  // update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
  //   return `This action updates a #${id} feedback`;
  // }

  remove(id: number) {
    try {
      this.feedback.delete(id);
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
