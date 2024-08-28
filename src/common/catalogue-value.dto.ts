import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString } from 'class-validator';

export class CatalogueValuesDto {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNumberString()
  count: string;
}
