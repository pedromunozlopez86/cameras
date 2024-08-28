import { Module } from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CapturesController } from './captures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capture } from './entities/capture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Capture])],
  controllers: [CapturesController],
  providers: [CapturesService],
  exports: [CapturesService],
})
export class CapturesModule {}
