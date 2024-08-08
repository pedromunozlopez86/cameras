import { Injectable } from '@nestjs/common';
import { CreateCaptureRangeDto } from './dto/create-capture-range.dto';
import { UpdateCaptureRangeDto } from './dto/update-capture-range.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaptureRange } from './entities/capture-range.entity';

@Injectable()
export class CaptureRangeService {
  constructor(
    @InjectRepository(CaptureRange)
    private captureRangeRepository: Repository<CaptureRange>,
  ) {}
  create(createCaptureRangeDto: CreateCaptureRangeDto) {
    try {
      const captureRange = this.captureRangeRepository.create(
        createCaptureRangeDto,
      );
      return this.captureRangeRepository.save(captureRange);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.captureRangeRepository.find();
  }

  findOne(id: number) {
    return this.captureRangeRepository.findOne({ where: { id } });
  }

  update(id: number, updateCaptureRangeDto: UpdateCaptureRangeDto) {
    return this.captureRangeRepository.update(id, updateCaptureRangeDto);
  }

  remove(id: number) {
    return `This action removes a #${id} captureRange`;
  }
}
