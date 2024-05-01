import { PartialType } from '@nestjs/swagger';
import { CreateLeaveApplyDto } from './create-leave_apply.dto';

export class UpdateLeaveApplyDto extends PartialType(CreateLeaveApplyDto) {}
