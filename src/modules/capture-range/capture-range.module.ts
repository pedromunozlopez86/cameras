import { Module } from '@nestjs/common';
import { CaptureRangeService } from './capture-range.service';
import { CaptureRangeController } from './capture-range.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaptureRange } from './entities/capture-range.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaptureRange])],
  controllers: [CaptureRangeController],
  providers: [CaptureRangeService],
})
export class CaptureRangeModule {}
