import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DatveService } from './datve.service';
import { CreateDatveDto } from './dto/create-datve.dto';
import { UpdateDatveDto } from './dto/update-datve.dto';
import { LichChieu } from './entities/datve.entity';
import { ApiTags } from '@nestjs/swagger';
const jwt = require('jsonwebtoken')
@ApiTags("QuanLyDatVe")
@Controller('api')
export class DatveController {
  constructor(private readonly datveService: DatveService) { }

  @Get("/QuanLyDatVe/LayDanhSachPhongVe")
  getInforphongve(@Query('maLichChieu') maLichChieu: any) {
    return this.datveService.getInforphongve(maLichChieu);
  }

  @Post("/QuanLyDatVe/TaoLichChieu")

  createLichchieu(@Headers('token') token: string, @Body() LichChieu: LichChieu): Promise<string> {
    jwt.verify(token, "node-30");

    return this.datveService.createLichchieu(LichChieu);
  }


}
