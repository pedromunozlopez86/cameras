import { Injectable } from '@nestjs/common';
import { CreateInputCameraDto } from './dto/create-input-camera.dto';
import { CamerasService } from '../cameras/cameras.service';
import { CaptureRangeService } from '../capture-range/capture-range.service';
import { CapturesService } from '../captures/captures.service';
import { EventsService } from '../events/events.service';
import { UsersService } from '../users/users.service';
import { CatalogueValuesDto } from 'src/common/catalogue-value.dto';
import FaceExpressionsEnum from 'src/common/face-expressions.enum';

@Injectable()
export class InputCameraService {
  constructor(
    private readonly cameraService: CamerasService,
    private readonly captureRangeService: CaptureRangeService,
    private readonly capturesService: CapturesService,
    private readonly eventsService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createInputCameraDto: CreateInputCameraDto) {
    const { EventNotificationAlert } = createInputCameraDto;

    const FaceValue = await this.validateFaceExpression(
      EventNotificationAlert.FaceExpressionList.FaceExpression,
    );

    const faceExpressionIdToSave = FaceExpressionsEnum[FaceValue];
    try {
      const camerasResponse = await this.cameraService.create({
        channelId: EventNotificationAlert.channelID,
        ipAddress: EventNotificationAlert.ipAddress,
        portNo: +EventNotificationAlert.portNo,
        macAddress: EventNotificationAlert.macAddress,
        protocol: EventNotificationAlert.protocol,
        createdAt: EventNotificationAlert.dateTime,
      });

      const captureRangeResponse = await this.captureRangeService.create({
        createdAt: EventNotificationAlert.dateTime,
        onlyDay: EventNotificationAlert.dateTime,
        rangeTypeId: 1,
      });

      const eventsResponse = await this.eventsService.create({
        type: EventNotificationAlert.eventType,
        state: EventNotificationAlert.eventState,
        description: EventNotificationAlert.eventDescription,
        captureId: 0,
        createdAt: EventNotificationAlert.dateTime,
      });

      const capturesResponse = await this.capturesService.create({
        peopleCount: EventNotificationAlert.activePostCount,
        faceExpressionId: faceExpressionIdToSave,
        ageGroupId: 1,
        genderId: 1,
        mask: true,
        glassesId: 1,
        hatId: 1,
        cameraId: camerasResponse.id,
        timestamp: EventNotificationAlert.dateTime,
        createdAt: EventNotificationAlert.dateTime,
      });

      return {
        camerasResponse,
        captureRangeResponse,
        eventsResponse,
        capturesResponse,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  private async validateFaceExpression(faceExpressions: CatalogueValuesDto[]) {
    const maxCount = Math.max(
      ...faceExpressions.map((expression) => +expression.count),
    );
    const maxCountValue = faceExpressions.find(
      (expression) => +expression.count == maxCount,
    );
    return maxCountValue?.value || 'unknown';
  }
}
