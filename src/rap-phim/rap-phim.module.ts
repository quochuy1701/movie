import { Module } from '@nestjs/common';
import { RapPhimService } from './rap-phim.service';
import { RapPhimController } from './rap-phim.controller';

@Module({
  controllers: [RapPhimController],
  providers: [RapPhimService]
})
export class RapPhimModule {}
