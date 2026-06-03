import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  // Fitur Menambahkan Game Baru
  async create(createGameDto: CreateGameDto) {
    const newGame = await this.prisma.game.create({
      data: {
        title: createGameDto.title,
        genre: createGameDto.genre,
        release_year: createGameDto.release_year,
      },
    });
    return {
      message: 'Game berhasil ditambahkan',
      data: newGame,
    };
  }

  // Fitur Melihat Daftar Game (Dilengkapi Filter Pencarian Rahasia)
  async findAll(searchQuery?: string) {
    const games = await this.prisma.game.findMany({
      where: searchQuery
        ? { title: { contains: searchQuery } } // Mencari nama game yang mengandung kata kunci
        : {}, // Jika tidak ada pencarian, tampilkan semua
      orderBy: { release_year: 'desc' }, // Diurutkan dari yang paling baru
    });

    return {
      message: 'Berhasil mengambil daftar game',
      total: games.length,
      data: games,
    };
  }
}