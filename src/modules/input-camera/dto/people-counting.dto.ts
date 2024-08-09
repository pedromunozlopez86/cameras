import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FlowStatistics {
  @ApiProperty()
  @IsNumberString()
  countingLineID: number;

  @ApiProperty()
  @IsNumberString()
  pass: number;

  @ApiProperty()
  @ValidateNested()
  movingDirectionList: MovingDirection[];
}

export class MovingDirection {
  @ApiProperty()
  @IsNumberString()
  countingLineSegmentID: number;

  @ApiProperty()
  @IsNumberString()
  count: number;
}

export class TimeRange {
  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;
}

export class PeopleCountingDto {
  @ApiProperty({ description: 'The IP address of the camera' })
  @IsString()
  statisticalMethods: string;

  @ApiProperty()
  @IsNotEmptyObject()
  TimeRange: TimeRange;

  @ApiProperty()
  @IsNumberString()
  enter: number;

  @ApiProperty()
  @IsNumberString()
  exit: number;

  @ApiProperty()
  @IsNumberString()
  pass: number;

  @ApiProperty()
  @IsNumberString()
  duplicatePeople: number;

  @ApiProperty()
  @IsNotEmpty()
  FlowStatisticsList: { FlowStatistics: FlowStatistics };

  @ApiProperty()
  @IsString()
  countingSceneMode: string;

  @ApiProperty()
  @IsNumberString()
  deDuplicateEnter: number;

  @ApiProperty()
  @IsNumberString()
  deDuplicateExit: number;
}
