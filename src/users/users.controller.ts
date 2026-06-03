import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/profile')
  @UseGuards(AuthGuard('jwt')) 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Mendapatkan profil user' })
  getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }
}