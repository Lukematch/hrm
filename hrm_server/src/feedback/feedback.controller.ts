import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('/api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() body: any) {
    return this.feedbackService.create(body);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.feedbackService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
  //   return this.feedbackService.update(+id, updateFeedbackDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.feedbackService.remove(id);
  }
}
