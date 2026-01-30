import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonPlanDto {
  @ApiProperty({ example: 'Introduction to React', description: 'Title of the lesson plan' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'A basic introduction to React components', description: 'Description of the lesson plan', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '# React Basics...', description: 'Content of the lesson plan (Markdown/JSON)' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ example: 'Web Development', description: 'Subject of the lesson plan' })
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @ApiProperty({ example: 'Beginner', description: 'Grade level or difficulty' })
  @IsString()
  @IsNotEmpty()
  gradeLevel!: string;
}
