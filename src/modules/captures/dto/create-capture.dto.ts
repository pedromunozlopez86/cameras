import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';
import { CommonDto } from 'src/common/common.dto';

export class CreateCaptureDto extends CommonDto {
  @ApiProperty()
  @IsNumber()
  peopleCount: number;

  @ApiProperty()
  @IsNumber()
  faceExpressionId: number;

  @ApiProperty()
  @IsNumber()
  ageGroupId: number;

  @ApiProperty()
  @IsNumber()
  genderId: number;

  @ApiProperty()
  @IsBoolean()
  mask: boolean;

  @ApiProperty()
  @IsNumber()
  glassesId: number;

  @ApiProperty()
  @IsNumber()
  hatId: number;

  @ApiProperty()
  @IsNumber()
  cameraId: number;

  @ApiProperty()
  @IsDateString()
  timestamp: Date;
}
