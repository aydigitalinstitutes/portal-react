import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example: 'refresh_token_string',
    description: 'The refresh token',
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
