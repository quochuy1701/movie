import { PartialType } from '@nestjs/swagger';
import { CreateDatveDto } from './create-datve.dto';

export class UpdateDatveDto extends PartialType(CreateDatveDto) {}
