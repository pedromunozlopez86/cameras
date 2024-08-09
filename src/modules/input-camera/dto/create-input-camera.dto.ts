import { ApiProperty } from '@nestjs/swagger';
import { EventNotificationAlert } from './event-notification-alert.dto';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInputCameraDto {
  @ApiProperty({ description: 'EventNotificationAlert object SOAP' })
  @IsObject()
  @ValidateNested()
  @Type(() => EventNotificationAlert)
  EventNotificationAlert: EventNotificationAlert;
}
