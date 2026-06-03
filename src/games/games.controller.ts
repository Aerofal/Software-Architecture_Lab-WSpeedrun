import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Games')
@ApiBearerAuth() 
@UseGuards(AuthGuard('jwt')) 
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Menambahkan game parkour baru' })
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Melihat daftar game' })
  @ApiQuery({ name: 'search', required: false, description: 'Cari game berdasarkan judul' }) // Dokumentasi fitur search
  findAll(@Query('search') search?: string) {
    return this.gamesService.findAll(search);
  }
}