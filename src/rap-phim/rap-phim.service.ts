import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRapPhimDto } from './dto/create-rap-phim.dto';
import { UpdateRapPhimDto } from './dto/update-rap-phim.dto';
import { CumRap, HeThongRap, Phim, PrismaClient, RapPhim } from '@prisma/client';

@Injectable()
export class RapPhimService {
  private prisma = new PrismaClient()

  async getInfor(ma_he_thong_rap: any) {
    try {
      let data: HeThongRap[] = await this.prisma.heThongRap.findMany({
        where: {
          ma_he_thong_rap: ma_he_thong_rap
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

  async getInforCumRap(ma_he_thong_rap: any) {
    try {
      let data: CumRap[] = await this.prisma.cumRap.findMany({
        where: {
          ma_he_thong_rap: ma_he_thong_rap
        },
        include: {
          RapPhim: true,
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

  async getInforlichchieu(ma_he_thong_rap: any) {
    try {
      let data = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            select: {
              RapPhim: {
                select: {
                  LichChieu: {
                    select: {
                      Phim:{
                        select:{
                          LichChieu:true,
                          ma_phim:true,
                          ten_phim:true,
                          hinh_anh:true,
                          hot:true,
                          dang_chieu:true,
                          sap_chieu:true,
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        where:{
          ma_he_thong_rap
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

  update(id: number, updateRapPhimDto: UpdateRapPhimDto) {
    return `This action updates a #${id} rapPhim`;
  }

  remove(id: number) {
    return `This action removes a #${id} rapPhim`;
  }
}
