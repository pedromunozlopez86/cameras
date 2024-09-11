import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Capture } from './entities/capture.entity';
import { Between, Repository } from 'typeorm';
import FaceExpressionsEnum from 'src/common/face-expressions.enum';
import GenderValue from 'src/common/gender.enum';
import { DateRangeDto } from './dto/date-range.dto';

@Injectable()
export class CapturesService {
  constructor(
    @InjectRepository(Capture)
    private capturesRepository: Repository<Capture>,
  ) {}
  async create(createCaptureDto: CreateCaptureDto) {
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

  async countPersonsByFaceExpression(
    faceExpressionId: number,
    range: DateRangeDto,
  ) {
    if (range.endDate < range.startDate) {
      throw new BadRequestException(
        'End date should be greater than start date',
      );
    }
    try {
      if (!range.startDate && !range.endDate) {
        const countWithoutDate = await this.capturesRepository.count({
          where: {
            faceExpressionId,
          },
        });

        return {
          faceExpressionType: FaceExpressionsEnum[faceExpressionId],
          count: countWithoutDate,
        };
      } else if (range.startDate && range.endDate) {
        const countWithoutFace = await this.capturesRepository.count({
          where: {
            timestamp: Between(
              new Date(range?.startDate),
              new Date(range?.endDate),
            ),
          },
        });

        return {
          faceExpressionId: FaceExpressionsEnum[faceExpressionId],
          count: countWithoutFace,
          range: { startDate: range.startDate, endDate: range.endDate },
        };
      }
    } catch (error) {
      console.log('error', error);
      throw new Error(error.message);
    }
  }

  async countPersonsByGender(genderId: number, range: DateRangeDto) {
    if (range.endDate < range.startDate) {
      throw new BadRequestException(
        'End date should be greater than start date',
      );
    }
    try {
      if (!range.startDate && !range.endDate) {
        const countWithoutDate = await this.capturesRepository.count({
          where: { genderId },
        });

        return {
          genderId: GenderValue[genderId],
          count: countWithoutDate,
        };
      } else if (range.startDate && range.endDate) {
        const countWithoutGender = await this.capturesRepository.count({
          where: {
            timestamp: Between(
              new Date(range?.startDate),
              new Date(range?.endDate),
            ),
          },
        });
        return {
          genderId: GenderValue[genderId],
          count: countWithoutGender,
          range: { startDate: range.startDate, endDate: range.endDate },
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
