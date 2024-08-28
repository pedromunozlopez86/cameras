import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CommonDto } from 'src/common/common.dto';

export class CreateCameraDto extends CommonDto {
  @ApiProperty()
  @IsString()
  ipAddress: string;

  @ApiProperty()
  @IsNumber()
  portNo: number;

  @ApiProperty()
  @IsString()
  protocol: string;

  @ApiProperty()
  @IsString()
  macAddress: string;

  @ApiProperty()
  @IsString()
  channelId: string;
}
