import { PartialType } from '@nestjs/swagger';
import { CreateRLoginDto } from './create-r_login.dto';

export class UpdateRLoginDto extends PartialType(CreateRLoginDto) {}
