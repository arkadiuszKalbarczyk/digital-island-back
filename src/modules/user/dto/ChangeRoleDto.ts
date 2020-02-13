'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from '../../../common/constants/role-type';

export class ChangeRoleDto {
    @IsString()
    @ApiProperty({ enum: RoleType })
    role: RoleType;

    @IsNotEmpty()
    @ApiProperty()
    id: string;
}
