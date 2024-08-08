import { PartialType } from '@nestjs/swagger';
import { CreateInputCameraDto } from './create-input-camera.dto';

export class UpdateInputCameraDto extends PartialType(CreateInputCameraDto) {}
