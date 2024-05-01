import { PartialType } from '@nestjs/swagger';
import { CreateTrainContentDto } from './create-train_content.dto';

export class UpdateTrainContentDto extends PartialType(CreateTrainContentDto) {}
