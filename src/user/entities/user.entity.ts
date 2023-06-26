import { ApiProperty } from "@nestjs/swagger";

export class UserSignup {
    @ApiProperty()
    tai_khoan: any;

    @ApiProperty()
    ho_ten: string

    @ApiProperty()
    email: string;

    @ApiProperty()
    so_dt: string

    @ApiProperty()
    mat_khau: string

    @ApiProperty()
    loai_nguoi_dung: string
}
export class UserLogin {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string
}