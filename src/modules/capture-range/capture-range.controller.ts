import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaptureRangeService } from './capture-range.service';
import { CreateCaptureRangeDto } from './dto/create-capture-range.dto';
import { UpdateCaptureRangeDto } from './dto/update-capture-range.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Capture Range')
@Controller('capture-range')
export class CaptureRangeController {
  constructor(private readonly captureRangeService: CaptureRangeService) {}

  @Post()
  create(@Body() createCaptureRangeDto: CreateCaptureRangeDto) {
    return this.captureRangeService.create(createCaptureRangeDto);
  }

  @Get()
  findAll() {
    return this.captureRangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.captureRangeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCaptureRangeDto: UpdateCaptureRangeDto,
  ) {
    return this.captureRangeService.update(+id, updateCaptureRangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.captureRangeService.remove(+id);
  }
}
