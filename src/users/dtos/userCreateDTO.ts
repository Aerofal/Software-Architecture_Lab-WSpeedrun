/*eslint-disable*/

import { ApiProperty } from "@nestjs/swagger";

export class userCreateDTO{
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    email: string;
}