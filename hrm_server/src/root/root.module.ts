import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { RootController } from './root.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Root } from './entities/root.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Root])],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
