import { ApiProperty } from "@nestjs/swagger";

export class Datve {}
export class LichChieu{
    @ApiProperty()
    ma_lich_chieu:any
    @ApiProperty()
    ma_rap:any
    @ApiProperty()
    ma_phim:any
    @ApiProperty()
    ngay_gio_chieu:any
    @ApiProperty()
    gia_ve:any

}