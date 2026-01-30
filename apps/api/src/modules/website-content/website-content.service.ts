import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { CreateTestimonialDto, UpdateTestimonialDto } from './dto/testimonial.dto';
import { CreateContentItemDto, UpdateContentItemDto } from './dto/content-item.dto';

@Injectable()
export class WebsiteContentService {
  constructor(private prisma: PrismaService) {}

  // Courses
  async findAllCourses() {
    return this.prisma.course.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneCourse(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async createCourse(dto: CreateCourseDto) {
    return this.prisma.course.create({ data: dto });
  }

  async updateCourse(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async removeCourse(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }

  // Testimonials
  async findAllTestimonials() {
    return this.prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneTestimonial(id: string) {
    return this.prisma.testimonial.findUnique({ where: { id } });
  }

  async createTestimonial(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async updateTestimonial(id: string, dto: UpdateTestimonialDto) {
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async removeTestimonial(id: string) {
    return this.prisma.testimonial.delete({ where: { id } });
  }

  // Content Items
  async findAllContentItems(section?: string) {
    if (section) {
      return this.prisma.contentItem.findMany({ where: { section }, orderBy: { order: 'asc' } });
    }
    return this.prisma.contentItem.findMany({ orderBy: { order: 'asc' } });
  }

  async findOneContentItem(id: string) {
    return this.prisma.contentItem.findUnique({ where: { id } });
  }

  async createContentItem(dto: CreateContentItemDto) {
    return this.prisma.contentItem.create({ data: dto });
  }

  async updateContentItem(id: string, dto: UpdateContentItemDto) {
    return this.prisma.contentItem.update({ where: { id }, data: dto });
  }

  async removeContentItem(id: string) {
    return this.prisma.contentItem.delete({ where: { id } });
  }
}
