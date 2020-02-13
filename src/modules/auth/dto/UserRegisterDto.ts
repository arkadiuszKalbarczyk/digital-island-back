'use strict';

import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { RoleType } from 'src/common/constants/role-type';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty({ minLength: 6 })
    readonly password: string;

    @Column()
    @IsPhoneNumber('ZZ')
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string;

    @Column()
    @IsNotEmpty()
    @ApiProperty()
    role?: RoleType;
}
