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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { WebsiteContentService } from './website-content.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from './dto/testimonial.dto';
import {
  CreateContentItemDto,
  UpdateContentItemDto,
} from './dto/content-item.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles.decorator';

@ApiTags('Website Content')
@Controller('website-content')
export class WebsiteContentController {
  constructor(private readonly websiteContentService: WebsiteContentService) {}

  // Courses
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.' })
  @Get('courses')
  findAllCourses() {
    return this.websiteContentService.findAllCourses();
  }

  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Return a course.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  @Get('courses/:id')
  findOneCourse(@Param('id') id: string) {
    return this.websiteContentService.findOneCourse(id);
  }

  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  @Post('courses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  createCourse(@Body() dto: CreateCourseDto) {
    return this.websiteContentService.createCourse(dto);
  }

  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully updated.',
  })
  @ApiBearerAuth()
  @Patch('courses/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.websiteContentService.updateCourse(id, dto);
  }

  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({
    status: 200,
    description: 'The course has been successfully deleted.',
  })
  @ApiBearerAuth()
  @Delete('courses/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  removeCourse(@Param('id') id: string) {
    return this.websiteContentService.removeCourse(id);
  }

  // Testimonials
  @ApiOperation({ summary: 'Get all testimonials' })
  @ApiResponse({ status: 200, description: 'Return all testimonials.' })
  @Get('testimonials')
  findAllTestimonials() {
    return this.websiteContentService.findAllTestimonials();
  }

  @ApiOperation({ summary: 'Get a testimonial by id' })
  @ApiResponse({ status: 200, description: 'Return a testimonial.' })
  @Get('testimonials/:id')
  findOneTestimonial(@Param('id') id: string) {
    return this.websiteContentService.findOneTestimonial(id);
  }

  @ApiOperation({ summary: 'Create a new testimonial' })
  @ApiResponse({
    status: 201,
    description: 'The testimonial has been successfully created.',
  })
  @ApiBearerAuth()
  @Post('testimonials')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.websiteContentService.createTestimonial(dto);
  }

  @ApiOperation({ summary: 'Update a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'The testimonial has been successfully updated.',
  })
  @ApiBearerAuth()
  @Patch('testimonials/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  updateTestimonial(
    @Param('id') id: string,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return this.websiteContentService.updateTestimonial(id, dto);
  }

  @ApiOperation({ summary: 'Delete a testimonial' })
  @ApiResponse({
    status: 200,
    description: 'The testimonial has been successfully deleted.',
  })
  @ApiBearerAuth()
  @Delete('testimonials/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  removeTestimonial(@Param('id') id: string) {
    return this.websiteContentService.removeTestimonial(id);
  }

  // Content Items
  @ApiOperation({ summary: 'Get all content items' })
  @ApiResponse({ status: 200, description: 'Return all content items.' })
  @ApiQuery({
    name: 'section',
    required: false,
    description: 'Filter by section',
  })
  @Get('items')
  findAllContentItems(@Query('section') section?: string) {
    return this.websiteContentService.findAllContentItems(section);
  }

  @ApiOperation({ summary: 'Get a content item by id' })
  @ApiResponse({ status: 200, description: 'Return a content item.' })
  @Get('items/:id')
  findOneContentItem(@Param('id') id: string) {
    return this.websiteContentService.findOneContentItem(id);
  }

  @ApiOperation({ summary: 'Create a new content item' })
  @ApiResponse({
    status: 201,
    description: 'The content item has been successfully created.',
  })
  @ApiBearerAuth()
  @Post('items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  createContentItem(@Body() dto: CreateContentItemDto) {
    return this.websiteContentService.createContentItem(dto);
  }

  @ApiOperation({ summary: 'Update a content item' })
  @ApiResponse({
    status: 200,
    description: 'The content item has been successfully updated.',
  })
  @ApiBearerAuth()
  @Patch('items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  updateContentItem(
    @Param('id') id: string,
    @Body() dto: UpdateContentItemDto,
  ) {
    return this.websiteContentService.updateContentItem(id, dto);
  }

  @ApiOperation({ summary: 'Delete a content item' })
  @ApiResponse({
    status: 200,
    description: 'The content item has been successfully deleted.',
  })
  @ApiBearerAuth()
  @Delete('items/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  removeContentItem(@Param('id') id: string) {
    return this.websiteContentService.removeContentItem(id);
  }
}
