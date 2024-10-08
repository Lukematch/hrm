import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';

@Controller('/api/command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @Post()
  create(@Body() body: any) {
    return this.commandService.create(body);
  }

  @Get()
  findAll() {
    return this.commandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandService.find(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
  //   return this.commandService.update(+id, updateCommandDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandService.remove(id);
  }
}
