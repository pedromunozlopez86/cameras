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
import { PeopleCountingDto } from './people-counting.dto';
import { Type } from 'class-transformer';

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
  FaceExpressionList: any;

  @ApiProperty()
  @IsNotEmptyObject()
  GenderList: any;

  @ApiProperty()
  @IsNotEmptyObject()
  MaskList: any;

  @ApiProperty()
  @IsNotEmptyObject()
  AgeGroupList: any;

  @ApiProperty()
  @IsNotEmptyObject()
  GlassList: any;

  @ApiProperty()
  @IsNotEmptyObject()
  HatList: any;

  @ApiProperty()
  @IsBooleanString()
  isDataRetransmission: boolean;

  @ApiProperty()
  @IsNotEmpty()
  $: any;
}
