import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ example: 'Mirror\'s Edge', description: 'Judul game parkour' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: '3D Action Parkour', description: 'Genre game' })
  @IsNotEmpty()
  @IsString()
  genre!: string;

  @ApiProperty({ example: 2008, description: 'Tahun rilis game' })
  @IsNotEmpty()
  @IsNumber()
  release_year!: number;
}