import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './JwtStrategy';
import { Camera } from '../cameras/entities/camera.entity';
import { Capture } from '../captures/entities/capture.entity';
import { CaptureRange } from '../capture-range/entities/capture-range.entity';
import { Event } from '../events/entities/event.entity';
import { User } from '../users/entities/user.entity';
import { CamerasService } from '../cameras/cameras.service';
import { CaptureRangeService } from '../capture-range/capture-range.service';
import { CapturesService } from '../captures/captures.service';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Camera, Capture, CaptureRange, Event, User]),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '100d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    CamerasService,
    CaptureRangeService,
    CapturesService,
    EventsService,
    UsersService,
  ],
})
export class AuthModule {}
