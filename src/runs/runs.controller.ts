import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { RunsService } from './runs.service';
import { CreateRunDto } from './dto/create-run.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Runs (Speedrun Records)')
@ApiBearerAuth() // Memunculkan logo gembok
@UseGuards(AuthGuard('jwt')) // Mengunci API wajib login
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit rekor speedrun baru' })
  submitRun(@Req() req: any, @Body() createRunDto: CreateRunDto) {
    // Mengekstrak userId otomatis dari JWT token yang sedang login
    const userId = req.user.userId;
    return this.runsService.submitRun(userId, createRunDto);
  }

  @Get('leaderboard/:gameId')
  @ApiOperation({ summary: 'Melihat papan klasemen berdasarkan Game ID' })
  getLeaderboard(@Param('gameId') gameId: string) {
    return this.runsService.getLeaderboard(gameId);
  }
}