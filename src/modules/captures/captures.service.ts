import { Injectable } from '@nestjs/common';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Capture } from './entities/capture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CapturesService {
  constructor(
    @InjectRepository(Capture)
    private capturesRepository: Repository<Capture>,
  ) {}
  create(createCaptureDto: CreateCaptureDto) {
    try {
      const capture = this.capturesRepository.create(createCaptureDto);
      return this.capturesRepository.save(capture);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.capturesRepository.find();
  }

  findOne(id: number) {
    return this.capturesRepository.findOne({ where: { id } });
  }

  update(id: number, updateCaptureDto: UpdateCaptureDto) {
    return this.capturesRepository.update(id, updateCaptureDto);
  }
}
