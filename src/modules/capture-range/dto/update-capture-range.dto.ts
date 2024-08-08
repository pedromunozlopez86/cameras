import { PartialType } from '@nestjs/swagger';
import { CreateCaptureRangeDto } from './create-capture-range.dto';

export class UpdateCaptureRangeDto extends PartialType(CreateCaptureRangeDto) {}
