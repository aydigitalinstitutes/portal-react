import { IsOptional, IsString, MinLength, MaxLength, Matches, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers and underscores',
  })
  username?: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: '1990-01-01', description: 'Date of birth', required: false })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiProperty({ example: 'Male', description: 'Gender', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
