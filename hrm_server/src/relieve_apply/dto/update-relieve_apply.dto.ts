import { PartialType } from '@nestjs/swagger';
import { CreateRelieveApplyDto } from './create-relieve_apply.dto';

export class UpdateRelieveApplyDto extends PartialType(CreateRelieveApplyDto) {}
