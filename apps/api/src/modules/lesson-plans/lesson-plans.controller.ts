import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { LessonPlansService } from './lesson-plans.service';
import { CreateLessonPlanDto } from './dto/create-lesson-plan.dto';
import { UpdateLessonPlanDto } from './dto/update-lesson-plan.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@ApiTags('Lesson Plans')
@Controller('lesson-plans')
export class LessonPlansController {
  constructor(private readonly lessonPlansService: LessonPlansService) {}

  @ApiOperation({ summary: 'Create a new lesson plan' })
  @ApiResponse({
    status: 201,
    description: 'The lesson plan has been successfully created.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TEACHER', 'ADMIN', 'SUPER_ADMIN')
  @Post()
  create(@Req() req: any, @Body() createLessonPlanDto: CreateLessonPlanDto) {
    return this.lessonPlansService.create(req.user.id, createLessonPlanDto);
  }

  @ApiOperation({ summary: 'List all lesson plans' })
  @ApiResponse({ status: 200, description: 'Return all lesson plans.' })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @Get()
  findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.lessonPlansService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @ApiOperation({ summary: 'Get a lesson plan by id' })
  @ApiResponse({ status: 200, description: 'Return a lesson plan.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonPlansService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a lesson plan' })
  @ApiResponse({
    status: 200,
    description: 'The lesson plan has been successfully updated.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TEACHER', 'ADMIN', 'SUPER_ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonPlanDto: UpdateLessonPlanDto,
  ) {
    return this.lessonPlansService.update(id, updateLessonPlanDto);
  }

  @ApiOperation({ summary: 'Delete a lesson plan' })
  @ApiResponse({
    status: 200,
    description: 'The lesson plan has been successfully deleted.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TEACHER', 'ADMIN', 'SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonPlansService.remove(id);
  }
}
