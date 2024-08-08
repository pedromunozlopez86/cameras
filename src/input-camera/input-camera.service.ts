import { Injectable } from '@nestjs/common';
import { CreateInputCameraDto } from './dto/create-input-camera.dto';
import { UpdateInputCameraDto } from './dto/update-input-camera.dto';

@Injectable()
export class InputCameraService {
  create(createInputCameraDto: CreateInputCameraDto) {
    return 'This action adds a new inputCamera';
  }

  findAll() {
    return `This action returns all inputCamera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inputCamera`;
  }

  update(id: number, updateInputCameraDto: UpdateInputCameraDto) {
    return `This action updates a #${id} inputCamera`;
  }

  remove(id: number) {
    return `This action removes a #${id} inputCamera`;
  }
}
