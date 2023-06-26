import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { PhimUpLoad } from './entities/film.entity';
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
@ApiTags("QuanLyPhim")
@Controller('api')
export class FilmController {
  constructor(private readonly filmService: FilmService) { }

  @Get("/QuanLyPhim/LayDanhSachBanner")
  getBanner() {
    return this.filmService.getBanner();
  }

  @Get('/QuanLyPhim/LayDanhSachPhim')
  getFilm() {
    return this.filmService.getFilm();
  }

  @Get('/QuanLyPhim/LayDanhSachPhimPhanTrang')
  getFilmPage(@Query("sotrang") sotrang: any, @Query("sophantutrentrang") sophantutrentrang: string) {
    return this.filmService.getFilmPage(sotrang, sophantutrentrang);
  }

  @Get('/QuanLyPhim/LayDanhSachPhimTheoNgay')
  getFilmPageDate(@Query("sotrang") sotrang: any, @Query("sophantutrentrang") sophantutrentrang: string, @Query("tuNgay") tuNgay: string, @Query("denNgay") denNgay: string) {
    return this.filmService.getFilmPageDate(sotrang, sophantutrentrang, tuNgay, denNgay);
  }

  @Post('/QuanLyPhim/ThemPhim')
  addPhim(@Headers("token") token: string, @Body() phim: PhimUpLoad): Promise<Object> {
    jwt.verify(token, "node-30");



    return this.filmService.addPhim(phim)
  }
  @Post('/QuanLyPhim/CapNhatPhim')
  updatePhim(@Headers("token") token: string, @Body() user: PhimUpLoad): Promise<Object> {
    jwt.verify(token, "node-30");



    return this.filmService.updateUser(user)
  }
  @Delete('/QuanLyPhim/XoaPhim')
  DeletePhim(@Headers("token") token: string, @Query("maPhim") maPhim: any): Promise<Object> {
    jwt.verify(token, "node-30");



    return this.filmService.DeletePhim(maPhim)
  }


}
