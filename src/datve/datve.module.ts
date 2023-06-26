import { Module } from '@nestjs/common';
import { DatveService } from './datve.service';
import { DatveController } from './datve.controller';

@Module({
  controllers: [DatveController],
  providers: [DatveService]
})
export class DatveModule {}
