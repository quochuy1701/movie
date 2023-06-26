import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RapPhimService } from './rap-phim.service';
import { CreateRapPhimDto } from './dto/create-rap-phim.dto';
import { UpdateRapPhimDto } from './dto/update-rap-phim.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("QuanLyRap")
@Controller('api')
export class RapPhimController {
  constructor(private readonly rapPhimService: RapPhimService) {}

 @Get('/QuanLyRap/LayThongTinHeThongRap')
  getInfor(@Query("maHeThongRap") maHeThongRap:any) {
    return this.rapPhimService.getInfor(maHeThongRap);
  }


  @Get('/QuanLyRap/LayThongTinCumRapTheoHeThong')
  getInforCumRap(@Query("maHeThongRap") maHeThongRap:any) {
    return this.rapPhimService.getInforCumRap(maHeThongRap);
  }

  @Get('/QuanLyRap/LayThongTinLichChieuHeThongRap')
  getInforlichchieu(@Query("maHeThongRap") maHeThongRap:any) {
    return this.rapPhimService.getInforlichchieu(maHeThongRap);
  }

 

  
}
