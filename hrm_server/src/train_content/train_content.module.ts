import { Module } from '@nestjs/common';
import { TrainContentService } from './train_content.service';
import { TrainContentController } from './train_content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainContent } from './entities/train_content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainContent])],
  controllers: [TrainContentController],
  providers: [TrainContentService],
})
export class TrainContentModule {}
