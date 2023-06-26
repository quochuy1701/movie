import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserLogin, UserSignup } from './entities/user.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
  }
  private prisma = new PrismaClient();
  async login(userLogin: UserLogin) {



    let { email, password } = userLogin;
    let checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
        email
      }
    })
    if (checkUser) {

      let checkPass = bcrypt.compareSync(password, checkUser.mat_khau);
      if (checkPass) {
        let token = jwt.sign(checkUser, "node-30", { algorithm: "HS256", expiresIn: "5m" });
        return token
      }
      else {
        throw new HttpException(" Mật khẩu không đúng", HttpStatus.NOT_FOUND);
      }
    }
    else {

      throw new HttpException("Email hoặc mật khẩu không đúng", HttpStatus.NOT_FOUND);

    }

  }
  async signUp(User: NguoiDung): Promise<string> {

    let { tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = User;
    let newData = {
      tai_khoan: Number(tai_khoan),
      ho_ten,
      email,
      so_dt,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      loai_nguoi_dung
    }
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email
      }
    })
    if (checkEmail) {
      throw new HttpException("Email đã tồn tại", HttpStatus.NOT_FOUND);
    }
    await this.prisma.nguoiDung.create({ data: newData });
    throw new HttpException("Đăng ký thành công", HttpStatus.OK);

  }


  async getUser(): Promise<Object> {
    try {
      let data: NguoiDung[] = await this.prisma.nguoiDung.findMany();
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


  async getUserPage(sotrang: number, sophantutrentrang: any): Promise<Object> {
    try {
      const index = (sotrang - 1) * sophantutrentrang;
      let data: NguoiDung[] = await this.prisma.nguoiDung.findMany({
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

  async findUser(tuKhoa: string): Promise<Object> {
    try {

      let data: NguoiDung[] = await this.prisma.nguoiDung.findMany({
        where: {
          ho_ten: {
            contains: tuKhoa,
          }
        },
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
  async getInforUser(tai_khoan: any): Promise<Object> {
    try {
      let data = await this.prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: Number(tai_khoan)
        },
        include: {
          DatVe: {
            include: {
              LichChieu: {
                include: {
                  RapPhim: {

                    include: {
                      Ghe: true,
                      CumRap: true,
                    }
                  }
                }
              }
            }
          }
        }
      });
      console.log(tai_khoan)
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


  async getInfor(user: any): Promise<Object> {
    try {
      let { tai_khoan } = user
      let data = await this.prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: Number(tai_khoan)
        },
        include: {
          DatVe: {
            include: {
              LichChieu: {
                include: {
                  RapPhim: {
                    include: {
                      Ghe: true,
                      CumRap: true,
                    }
                  }
                }
              }
            }
          }
        }
      });
      console.log(tai_khoan)
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

  async addUser(user: UserSignup): Promise<Object> {

    let { tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = user;
    let newData = {
      tai_khoan: Number(tai_khoan),
      ho_ten,
      email,
      so_dt,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      loai_nguoi_dung
    }
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email
      }
    })
    if (checkEmail) {
      throw new HttpException("Email đã tồn tại", HttpStatus.NOT_FOUND);
    }
    await this.prisma.nguoiDung.create({ data: newData });
    throw new HttpException("Đăng ký thành công", HttpStatus.OK);

  }
  async updateUser(user: UserSignup): Promise<Object> {


    let { tai_khoan, email, mat_khau } = user;

    let newData = {
      tai_khoan,
      email,
      mat_khau
    }

    await this.prisma.nguoiDung.update({
      where: {
        tai_khoan
      },
      data: newData
    })
    throw new HttpException("update thành công", HttpStatus.OK);


  }
  async DeleteUser(taiKhoan: UserSignup): Promise<Object> {




    await this.prisma.nguoiDung.delete({
      where: {
        tai_khoan: Number(taiKhoan)
      },

    })
    throw new HttpException("Xóa thành công", HttpStatus.OK);






  }

}

