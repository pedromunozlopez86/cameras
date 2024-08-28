import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { CommonDto } from 'src/common/common.dto';

export class CreateCaptureRangeDto extends CommonDto {
  @ApiProperty()
  @IsNumber()
  rangeTypeId: number;

  @ApiPropertyOptional()
  @IsDateString()
  onlyDay?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  weekStartDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  weekEndDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  monthStartDate?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  monthEndDate?: Date;
}
