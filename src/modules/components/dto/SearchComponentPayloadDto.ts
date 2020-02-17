'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SearchComponentPayloadDto {
    @Field()
    @ApiProperty()
    readonly phrase: string;

    @Field()
    @ApiProperty()
    readonly title: string;

    @Field()
    @ApiProperty()
    readonly component: string;
}
