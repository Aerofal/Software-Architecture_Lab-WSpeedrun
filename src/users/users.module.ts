/*eslint-disable*/

// Module: supaya project kita mengetahui service dan controller kita. 
// i.e., seperti Personal Relation di organisasi

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
