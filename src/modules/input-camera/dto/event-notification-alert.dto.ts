import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PeopleCountingDto } from './people-counting.dto';
import { CatalogueValuesDto } from 'src/common/catalogue-value.dto';

export class EventNotificationAlert {
  @ApiProperty()
  @IsString()
  ipAddress: string;

  @ApiProperty()
  @IsNumberString()
  portNo: string;

  @ApiProperty()
  @IsString()
  protocol: string;

  @ApiProperty()
  @IsString()
  macAddress: string;

  @ApiProperty()
  @IsNumberString()
  channelID: string;

  @ApiProperty()
  @IsDateString()
  dateTime: Date;

  @ApiProperty()
  @IsString()
  eventType: string;

  @ApiProperty()
  @IsString()
  eventState: string;

  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiProperty()
  @IsNumberString()
  activePostCount: number;

  @ApiProperty()
  @IsString()
  eventDescription: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => PeopleCountingDto)
  peopleCounting: PeopleCountingDto;

  @ApiProperty()
  @IsNotEmptyObject()
  FaceExpressionList: { FaceExpression: CatalogueValuesDto[] };

  @ApiProperty()
  @IsNotEmptyObject()
  GenderList: { Gender: CatalogueValuesDto[] };

  @ApiProperty()
  @IsNotEmptyObject()
  MaskList: CatalogueValuesDto[];

  @ApiProperty()
  @IsNotEmptyObject()
  AgeGroupList: CatalogueValuesDto[];

  @ApiProperty()
  @IsNotEmptyObject()
  GlassList: CatalogueValuesDto[];

  @ApiProperty()
  @IsNotEmptyObject()
  HatList: CatalogueValuesDto[];

  @ApiProperty()
  @IsBooleanString()
  isDataRetransmission: string;

  @ApiProperty()
  @IsNotEmpty()
  $: any;
}
