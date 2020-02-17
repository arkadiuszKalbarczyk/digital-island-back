'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class AddComponentDto {
    @Field()
    @IsString()
    @ApiProperty()
    component: string;

    @Field()
    @IsString()
    @ApiProperty()
    title: string;

    @Field()
    @IsString()
    @ApiProperty()
    titlePl: string;

    @Field()
    @IsString()
    @ApiProperty()
    titleEn: string;

    @Field()
    @IsString()
    @ApiProperty()
    tags: string;

    @Field()
    @IsString()
    @ApiProperty()
    tagsPl: string;

    @Field()
    @IsString()
    @ApiProperty()
    tagsEn: string;
}
