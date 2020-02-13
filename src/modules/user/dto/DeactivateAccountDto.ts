'use strict';

import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class DeactivateAccountDto {
    @Column()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
