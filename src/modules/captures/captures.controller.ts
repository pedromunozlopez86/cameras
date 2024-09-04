import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CapturesService } from './captures.service';
import { CreateCaptureDto } from './dto/create-capture.dto';
import { UpdateCaptureDto } from './dto/update-capture.dto';
import { ApiTags } from '@nestjs/swagger';
import { DateRangeDto } from './dto/date-range.dto';

@Controller('captures')
@ApiTags('Captures')
export class CapturesController {
  constructor(private readonly capturesService: CapturesService) {}

  @Post()
  create(@Body() createCaptureDto: CreateCaptureDto) {
    return this.capturesService.create(createCaptureDto);
  }

  @Get()
  findAll() {
    return this.capturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaptureDto: UpdateCaptureDto) {
    return this.capturesService.update(+id, updateCaptureDto);
  }

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
  @Get('count-by-gender/:genderId')
  countPersonsByGender(
    @Param('genderId', ParseIntPipe) genderId: number,
    @Query() range: DateRangeDto,
  ) {
    return this.capturesService.countPersonsByGender(+genderId, range);
  }
}
