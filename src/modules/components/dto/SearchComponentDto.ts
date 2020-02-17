'use strict';

import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class SearchComponentDto {
    @Field()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly phrase: string;

    @Field()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    readonly noEnding: boolean;
}
