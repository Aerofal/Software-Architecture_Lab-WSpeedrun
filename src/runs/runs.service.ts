import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  // Fitur 1: Submit Rekor Waktu
  async submitRun(userId: string, createRunDto: CreateRunDto) {
    // Pastikan game-nya benar-benar ada di database
    const gameExists = await this.prisma.game.findUnique({
      where: { game_id: createRunDto.game_id },
    });

    if (!gameExists) {
      throw new NotFoundException('Game tidak ditemukan');
    }

    const newRun = await this.prisma.run.create({
      data: {
        user_id: userId,
        game_id: createRunDto.game_id,
        time_in_seconds: createRunDto.time_in_seconds,
        video_url: createRunDto.video_url,
      },
    });

    return {
      message: 'Rekor speedrun berhasil dicatat!',
      data: newRun,
    };
  }

  // Fitur 2: Leaderboard (Diurutkan dari yang tercepat)
  async getLeaderboard(gameId: string) {
    const leaderboard = await this.prisma.run.findMany({
      where: { game_id: gameId },
      orderBy: { time_in_seconds: 'asc' }, // 'asc' berarti dari angka terkecil (tercepat)
      include: {
        user: {
          select: { username: true, country: true }, // Menampilkan siapa yang memegang rekor
        },
      },
    });

    return {
      message: 'Berhasil mengambil Papan Klasemen',
      total_runs: leaderboard.length,
      data: leaderboard,
    };
  }
}