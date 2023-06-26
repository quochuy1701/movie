import { ApiProperty } from "@nestjs/swagger";

export class Film { }
export class PhimUpLoad {
    @ApiProperty()
    ma_phim: any;

    @ApiProperty()
    ten_phim: string

    @ApiProperty()
    trailer: string;

    @ApiProperty()
    hinh_anh: string

    @ApiProperty()
    mo_ta: string

    @ApiProperty()
    ngay_khoi_chieu: any
    @ApiProperty()
    danh_gia: any
    @ApiProperty()
    hot: boolean
    @ApiProperty()
    dang_chieu: boolean
    @ApiProperty()
    sap_chieu: boolean

}