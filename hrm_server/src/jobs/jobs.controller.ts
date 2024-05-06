import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('/api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() body: any) {
    return this.jobsService.create(body);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.jobsService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.jobsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.jobsService.remove(id);
  }
}
