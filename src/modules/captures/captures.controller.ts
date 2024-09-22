import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DateRangeDto } from './dto/date-range.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('captures')
@ApiTags('Captures')
export class CapturesController {
  constructor(private readonly capturesService: CapturesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createCaptureDto: CreateCaptureDto) {
    return this.capturesService.create(createCaptureDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.capturesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capturesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaptureDto: UpdateCaptureDto) {
    return this.capturesService.update(+id, updateCaptureDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('count-by-face-expression/:faceExpressionId')
  countPersonsByFaceExpression(
    @Param('faceExpressionId', ParseIntPipe) faceExpressionId: number,
    @Query() range: DateRangeDto,
  ) {
    return this.capturesService.countPersonsByFaceExpression(
      +faceExpressionId,
      range,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('count-by-gender/:genderId')
  countPersonsByGender(
    @Param('genderId', ParseIntPipe) genderId: number,
    @Query() range: DateRangeDto,
  ) {
    return this.capturesService.countPersonsByGender(+genderId, range);
  }
}
