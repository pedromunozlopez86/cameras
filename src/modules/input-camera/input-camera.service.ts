import { Injectable } from '@nestjs/common';
import { CreateInputCameraDto } from './dto/create-input-camera.dto';

@Injectable()
export class InputCameraService {
  create(createInputCameraDto: CreateInputCameraDto) {
    const { EventNotificationAlert } = createInputCameraDto;
    console.log(EventNotificationAlert);
    return EventNotificationAlert;
  }
}
