import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Banner, Phim, PrismaClient } from '@prisma/client';
import { PhimUpLoad } from './entities/film.entity';

@Injectable()
export class FilmService {
  private prisma = new PrismaClient();
  async getBanner() {

    try {
      let data: Banner[] = await this.prisma.banner.findMany({
      });
      let listBanner = {
        "statas": 200,
        "message": 'Xử lý thành công',
        "content": data
      }
      return listBanner
    } catch (err) {
      throw new HttpException("Xử lý không thành công", HttpStatus.NOT_FOUND);

    }
  }

  async getFilm() {
    try {
      let data: Phim[] = await this.prisma.phim.findMany({
      });
      let listFirm = {
        "statas": 200,
        "message": 'Xử lý thành công',
        "content": data
      }
      return listFirm
    } catch (err) {
      throw new HttpException("Xử lý không thành công", HttpStatus.NOT_FOUND);

    }
  }

  async getFilmPage(sotrang: number, sophantutrentrang: any): Promise<Object> {
    try {
      const index = (sotrang - 1) * sophantutrentrang;
      let data: Phim[] = await this.prisma.phim.findMany({
        skip: Number(index),
        take: Number(sophantutrentrang),

      });
      let listUser = {
        "statas": 200,
        "message": 'Xử lý thành công',
        "content": data
      }
      return listUser
    } catch (err) {
      throw new HttpException("Xử lý không thành công", HttpStatus.NOT_FOUND);
    }

  }
  async getFilmPageDate(sotrang: number, sophantutrentrang: any, tuNgay: any, denNgay: any): Promise<Object> {

    const index = (sotrang - 1) * sophantutrentrang;
    let data: Phim[] = await this.prisma.phim.findMany({
      skip: Number(index),
      take: Number(sophantutrentrang),
      where: {
        ngay_khoi_chieu: {
          lte: new Date(denNgay),
          gte: new Date(tuNgay),
        },
      },
    });
    let listUser = {
      "statas": 200,
      "message": 'Xử lý thành công',
      "content": data
    }
    return listUser


  }

  async addPhim(user: PhimUpLoad): Promise<Object> {

    let { ma_phim, ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu } = user;
    let newData = {
      ten_phim,
      trailer,
      hinh_anh,
      mo_ta,
      ngay_khoi_chieu :new Date(ngay_khoi_chieu),
      danh_gia,
      hot,
      dang_chieu,
      sap_chieu
    }
    let checkEmail = await this.prisma.phim.findFirst({
      where: {
        ten_phim
      }
    })
    if (checkEmail) {
      throw new HttpException("Phim đã tồn tại", HttpStatus.NOT_FOUND);
    }
    await this.prisma.phim.create({ data: newData });
    throw new HttpException("Đăng ký thành công", HttpStatus.OK);

  }
  async updateUser(phim: PhimUpLoad): Promise<String> {


    let { ma_phim, ten_phim, trailer, hinh_anh, mo_ta, ngay_khoi_chieu, danh_gia, hot, dang_chieu, sap_chieu } = phim;
    let newData = {
      ma_phim,
      ten_phim,
      trailer,
      hinh_anh,
      mo_ta,
      ngay_khoi_chieu :new Date(ngay_khoi_chieu),
      danh_gia,
      hot,
      dang_chieu,
      sap_chieu
    }

    await this.prisma.phim.update({
      where: {
        ma_phim
      },
      data: newData
    })
    throw new HttpException("update thành công", HttpStatus.OK);


  }
  async DeletePhim(maPhim: PhimUpLoad): Promise<Object> {




    await this.prisma.phim.delete({
      where: {
        ma_phim: Number(maPhim)
      },

    })
    throw new HttpException("Xóa thành công", HttpStatus.OK);






  }
}
