import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { CommonDto } from 'src/common/common.dto';

export class CreateCaptureRangeDto extends CommonDto {
  @ApiProperty()
  @IsNumber()
  rangeTypeId: number;

  @ApiProperty()
  @IsDateString()
  onlyDay: Date;

  @ApiProperty()
  @IsDateString()
  weekStartDate: Date;

  @ApiProperty()
  @IsDateString()
  weekEndDate: Date;

  @ApiProperty()
  @IsDateString()
  monthStartDate: Date;

  @ApiProperty()
  @IsDateString()
  monthEndDate: Date;
}
