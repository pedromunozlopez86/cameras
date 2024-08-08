import { Module } from '@nestjs/common';
import { CamerasModule } from './modules/cameras/cameras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camera } from './modules/cameras/entities/camera.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { Event } from './modules/events/entities/event.entity';
import { CapturesModule } from './modules/captures/captures.module';
import { Capture } from './modules/captures/entities/capture.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { CaptureRangeModule } from './modules/capture-range/capture-range.module';
import { CaptureRange } from './modules/capture-range/entities/capture-range.entity';
import { InputCameraModule } from './input-camera/input-camera.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Camera, Event, Capture, User, CaptureRange],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CamerasModule,
    EventsModule,
    CapturesModule,
    UsersModule,
    CaptureRangeModule,
    InputCameraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
