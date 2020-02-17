'use strict';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SearchComponentHeaderDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lang: string;
}
