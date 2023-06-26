import { PartialType } from '@nestjs/swagger';
import { CreateRapPhimDto } from './create-rap-phim.dto';

export class UpdateRapPhimDto extends PartialType(CreateRapPhimDto) {}
