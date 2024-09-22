import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CaptureRangeService } from './capture-range.service';
import { CreateCaptureRangeDto } from './dto/create-capture-range.dto';
import { UpdateCaptureRangeDto } from './dto/update-capture-range.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Capture Range')
@Controller('capture-range')
export class CaptureRangeController {
  constructor(private readonly captureRangeService: CaptureRangeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCaptureRangeDto: CreateCaptureRangeDto) {
    return this.captureRangeService.create(createCaptureRangeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.captureRangeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.captureRangeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCaptureRangeDto: UpdateCaptureRangeDto,
  ) {
    return this.captureRangeService.update(+id, updateCaptureRangeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.captureRangeService.remove(+id);
  }
}
