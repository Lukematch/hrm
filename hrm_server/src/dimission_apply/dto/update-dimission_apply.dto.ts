import { PartialType } from '@nestjs/swagger';
import { CreateDimissionApplyDto } from './create-dimission_apply.dto';

export class UpdateDimissionApplyDto extends PartialType(CreateDimissionApplyDto) {}
