'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class EditUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly email: string;

    @IsPhoneNumber('ZZ')
    @IsNotEmpty()
    @ApiPropertyOptional()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
