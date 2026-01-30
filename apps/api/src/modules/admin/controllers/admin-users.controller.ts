import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { AdminUsersService } from '../services/admin-users.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('Admin Users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@ApiBearerAuth()
export class AdminUsersController {
  constructor(private readonly service: AdminUsersService) {}

  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Return a list of users.' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, description: 'Search query' })
  @ApiQuery({ name: 'role', required: false, enum: ['USER', 'ADMIN'], description: 'Filter by role' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: 'USER' | 'ADMIN',
    @Query('isActive') isActive?: string,
  ) {
    const pageNum = Math.max(1, Number(page ?? 1));
    const limitNum = Math.min(100, Math.max(1, Number(limit ?? 25)));
    const isActiveBool =
      isActive === undefined ? undefined : isActive === 'true';
    return this.service.list({
      page: pageNum,
      limit: limitNum,
      search,
      role,
      isActive: isActiveBool,
    });
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }
}
