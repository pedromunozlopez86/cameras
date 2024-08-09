import { Module } from '@nestjs/common';
import { InputCameraService } from './input-camera.service';
import { InputCameraController } from './input-camera.controller';

@Module({
  controllers: [InputCameraController],
  providers: [InputCameraService],
})
export class InputCameraModule {}
