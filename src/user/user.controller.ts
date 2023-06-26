import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers } from '@nestjs/common';
import { UserService } from './user.service';
const jwt = require("jsonwebtoken")
const jwt_decode = require('jwt-decode');

// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt

// localhost:8080/auth/login
import { ApiTags } from '@nestjs/swagger';
import { UserLogin, UserSignup } from './entities/user.entity';
@ApiTags("QuanLyNguoiDung")
@Controller('api')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // yarn prisma db pull
    // yarn prims generate


    @Post("/QuanLyNguoiDung/DangNhap")
    login(@Body() userLogin: UserLogin): Promise<string> {
        return this.userService.login(userLogin);
    }

    @Post("/QuanLyNguoiDung/DangKy")
    signUp(@Body() UserSignup: UserSignup): Promise<Object> {

        return this.userService.signUp(UserSignup);
    }
    @Get("/QuanLyNguoiDung/LayDanhSachNguoiDung")
    getUser(): Promise<Object> {

        return this.userService.getUser();
    }
    @Get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang")
    getUserPage(@Query("sotrang") sotrang: any, @Query("sophantutrentrang") sophantutrentrang: string): Promise<Object> {

        return this.userService.getUserPage(sotrang, sophantutrentrang);
    }
    @Get('/QuanLyNguoiDung/TimKiemNguoiDung')
    findUser(@Query("tuKhoa") tuKhoa: string): Promise<Object> {
        return this.userService.findUser(tuKhoa)
    }
    @Get('/QuanLyNguoiDung/LayThongTinNguoiDung')
    getInforUser(@Query("taiKhoan") taiKhoan: string, @Headers("token") token: string): Promise<Object> {
        jwt.verify(token, "node-30");


        var decoded = jwt_decode(token);
        return this.userService.getInforUser(taiKhoan)
    }
    @Get('/QuanLyNguoiDung/ThongTinTaiKhoan')
    getInfor(@Headers("token") token: string): Promise<Object> {
        jwt.verify(token, "node-30");


        var decoded = jwt_decode(token);
        return this.userService.getInfor(decoded)
    }

    @Post('/QuanLyNguoiDung/ThemNguoiDung')
    addUser(@Headers("token") token: string, @Body() user: UserSignup): Promise<Object> {
        jwt.verify(token, "node-30");



        return this.userService.addUser(user)
    }
    @Post('/QuanLyNguoiDung/CapNhatThongTinNguoiDung')
    updateUser(@Headers("token") token: string, @Body() user: UserSignup): Promise<Object> {
        jwt.verify(token, "node-30");



        return this.userService.updateUser(user)
    }
    @Delete('/QuanLyNguoiDung/XoaNguoiDung')
    DeleteUser(@Headers("token") token: string, @Query("taiKhoan") taiKhoan: any): Promise<Object> {
        jwt.verify(token, "node-30");



        return this.userService.DeleteUser(taiKhoan)
    }



}
