import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InputCameraService } from './input-camera.service';
import { CreateInputCameraDto } from './dto/create-input-camera.dto';
import { UpdateInputCameraDto } from './dto/update-input-camera.dto';

@Controller('input-camera')
export class InputCameraController {
  constructor(private readonly inputCameraService: InputCameraService) {}

  @Post()
  create(@Body() createInputCameraDto: CreateInputCameraDto) {
    return this.inputCameraService.create(createInputCameraDto);
  }

  @Get()
  findAll() {
    return this.inputCameraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inputCameraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInputCameraDto: UpdateInputCameraDto) {
    return this.inputCameraService.update(+id, updateInputCameraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inputCameraService.remove(+id);
  }
}
