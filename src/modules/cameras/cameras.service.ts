import { Injectable } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CamerasService {
  constructor(
    @InjectRepository(Camera)
    private camerasRepository: Repository<Camera>,
  ) {}

  create(createCameraDto: CreateCameraDto) {
    try {
      const camera = this.camerasRepository.create(createCameraDto);
      return this.camerasRepository.save(camera);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.camerasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} camera`;
  }

  update(id: number, updateCameraDto: UpdateCameraDto) {
    console.log(updateCameraDto);
    return `This action updates a #${id} camera`;
  }

  remove(id: number) {
    return `This action removes a #${id} camera`;
  }
}
