import { PartialType } from '@nestjs/swagger';
import { CreateELoginDto } from './create-e_login.dto';

export class UpdateELoginDto extends PartialType(CreateELoginDto) {}
