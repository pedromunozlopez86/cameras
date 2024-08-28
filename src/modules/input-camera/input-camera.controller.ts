import { Controller, Post, Body } from '@nestjs/common';
import { InputCameraService } from './input-camera.service';
import { CreateInputCameraDto } from './dto/create-input-camera.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('input-camera')
@Controller('input-camera')
export class InputCameraController {
  constructor(private readonly inputCameraService: InputCameraService) {}

  @Post()
  create(@Body() createInputCameraDto: CreateInputCameraDto) {
    return this.inputCameraService.create(createInputCameraDto);
  }
}
