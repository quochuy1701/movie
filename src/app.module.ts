import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.stratygy';
import { FilmModule } from './film/film.module';
import { DatveModule } from './datve/datve.module';
import { RapPhimModule } from './rap-phim/rap-phim.module';

@Module({
  imports: [UserModule,JwtModule.register({ global: true}), ConfigModule.forRoot({isGlobal:true}), FilmModule , DatveModule, RapPhimModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
