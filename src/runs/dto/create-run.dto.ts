import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRunDto {
  @ApiProperty({ description: 'ID game dari database (UUID)' })
  @IsNotEmpty()
  @IsString()
  game_id!: string;

  @ApiProperty({ example: 125, description: 'Waktu penyelesaian dalam detik' })
  @IsNotEmpty()
  @IsNumber()
  time_in_seconds!: number;

  @ApiProperty({ example: 'https://youtube.com/watch?v=12345', description: 'Link video bukti speedrun' })
  @IsNotEmpty()
  @IsUrl()
  video_url!: string;
}