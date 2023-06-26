import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDatveDto } from './dto/create-datve.dto';
import { UpdateDatveDto } from './dto/update-datve.dto';
import { LichChieu, PrismaClient } from '@prisma/client';
import { RapPhim } from 'src/rap-phim/entities/rap-phim.entity';

@Injectable()
export class DatveService {
  private prisma = new PrismaClient();

  async getInforphongve(malichchieu: any) {
    try {
      let data = await this.prisma.lichChieu.findMany({
        select: {
          ma_lich_chieu: true,

          Phim: {
            select: {
              ten_phim: true,
              hinh_anh: true,
              ngay_khoi_chieu: true,

            }
          },
          RapPhim: {
            select: {
              Ghe: true
            }
          }
        },
        where: {
          ma_lich_chieu: malichchieu
        }



      });
      let listUser = {
        "statas": 200,
        "message": 'Xử lý thành công',
        "content": data
      }
      return listUser
    } catch (err) {
      throw new HttpException("Xử lý không thành công", HttpStatus.NOT_FOUND);
    };
  }

  async createLichchieu(lichchieu: LichChieu): Promise<string> {

    let { ma_lich_chieu, ma_rap, ma_phim, ngay_gio_chieu, gia_ve } = lichchieu;
    let newData = {
      ma_lich_chieu: Number(ma_lich_chieu),
      ma_rap,
      ma_phim,
      ngay_gio_chieu:new Date(ngay_gio_chieu),
      gia_ve
    }
    let checkEmail = await this.prisma.lichChieu.findFirst({
      where: {
        ma_lich_chieu
      }
    })
    if (checkEmail) {
      throw new HttpException("Lich  chieu đã tồn tại", HttpStatus.NOT_FOUND);
    }
    await this.prisma.lichChieu.create({ data: newData });
    throw new HttpException("Tạo lịch chiếu thành công", HttpStatus.OK);

  }

  findOne(id: number) {
    return `This action returns a #${id} datve`;
  }

  update(id: number, updateDatveDto: UpdateDatveDto) {
    return `This action updates a #${id} datve`;
  }

  remove(id: number) {
    return `This action removes a #${id} datve`;
  }
}
