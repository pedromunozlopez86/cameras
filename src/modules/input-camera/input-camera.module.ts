import { Module } from '@nestjs/common';
import { InputCameraService } from './input-camera.service';
import { InputCameraController } from './input-camera.controller';
import { CamerasModule } from '../cameras/cameras.module';
import { CaptureRangeModule } from '../capture-range/capture-range.module';
import { CapturesModule } from '../captures/captures.module';
import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [InputCameraController],
  providers: [InputCameraService],
  imports: [
    CamerasModule,
    CaptureRangeModule,
    CapturesModule,
    EventsModule,
    UsersModule,
  ],
})
export class InputCameraModule {}
