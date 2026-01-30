import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'oldPassword123', description: 'The current password' })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'newPassword123', description: 'The new password', minLength: 6 })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
