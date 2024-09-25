import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Capture } from './entities/capture.entity';
import { Between, Repository } from 'typeorm';
import FaceExpressionsEnum from 'src/common/face-expressions.enum';
import GenderValue from 'src/common/gender.enum';
import { DateRangeDto } from './dto/date-range.dto';
import AgeGroupEnum from 'src/common/age-group.enum';

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

  async getAllCounts() {
    const genderCounts = await this.capturesRepository.query(`
    select "genderId" as "attributeId", count(*) as count
      from captures c 
      group by "genderId"
    `);

    const genderCountsWithEnum = genderCounts.map((count) => ({
      ...count,
      attributeId: GenderValue[count.attributeId],
    }));

    const faceExpressionCounts = await this.capturesRepository.query(`
    select "faceExpressionId" as "attributeId" , count(*) as count
      from captures c 
      group by "faceExpressionId"
    `);

    const faceExpressionCountsWithEnum = faceExpressionCounts.map((count) => ({
      ...count,
      attributeId: FaceExpressionsEnum[count.attributeId],
    }));

    const agesCounts = await this.capturesRepository.query(`
    select "ageGroupId" as "attributeId" , count(*) as count
      from captures c 
      group by "ageGroupId"
    `);

    const agesCountsWithEnum = agesCounts.map((count) => ({
      ...count,
      attributeId: AgeGroupEnum[count.attributeId],
    }));
    return {
      genderCountsWithEnum,
      faceExpressionCountsWithEnum,
      agesCountsWithEnum,
    };
  }

  async getAllCountsByDateRange(range: DateRangeDto) {
    if (range.endDate < range.startDate) {
      throw new BadRequestException(
        'End date should be greater than start date',
      );
    }
    try {
      const genderCounts = await this.capturesRepository.query(
        `
      select "genderId" as "attributeId", count(*) as count
        from captures c 
        where c.timestamp between $1 and $2
        group by "genderId"
      `,
        [new Date(range.startDate), new Date(range.endDate)],
      );

      const genderCountsWithEnum = genderCounts.map((count) => ({
        ...count,
        attributeId: GenderValue[count.attributeId],
      }));

      const faceExpressionCounts = await this.capturesRepository.query(
        `
      select "faceExpressionId" as "attributeId" , count(*) as count
        from captures c 
        where c.timestamp between $1 and $2
        group by "faceExpressionId"
      `,
        [new Date(range.startDate), new Date(range.endDate)],
      );
      const faceExpressionCountsWithEnum = faceExpressionCounts.map(
        (count) => ({
          ...count,
          attributeId: FaceExpressionsEnum[count.attributeId],
        }),
      );

      const agesCounts = await this.capturesRepository.query(
        `
      select "ageGroupId" as "attributeId" , count(*) as count
        from captures c 
        where c.timestamp between $1 and $2
        group by "ageGroupId"
      `,
        [new Date(range.startDate), new Date(range.endDate)],
      );
      const agesCountsWithEnum = agesCounts.map((count) => ({
        ...count,
        attributeId: AgeGroupEnum[count.attributeId],
      }));

      return {
        genderCountsWithEnum,
        faceExpressionCountsWithEnum,
        agesCountsWithEnum,
        range,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTotals() {
    const totalCaptures = await this.capturesRepository.count();
    return { totalCaptures };
  }

  async getTotalsByDateRange(range: DateRangeDto) {
    console.log('range', range);
    if (range.endDate < range.startDate) {
      throw new BadRequestException(
        'End date should be greater than start date',
      );
    }
    try {
      const totalCaptures = await this.capturesRepository.count({
        where: {
          timestamp: Between(
            new Date(range?.startDate),
            new Date(range?.endDate),
          ),
        },
      });
      return { totalCaptures, range };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
