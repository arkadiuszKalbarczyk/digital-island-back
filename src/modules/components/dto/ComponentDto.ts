'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { ComponentEntity } from '../component.entity';

@ObjectType()
export class ComponentDto extends AbstractDto {
    @Field()
    @ApiPropertyOptional()
    component: string;

    @Field()
    @ApiPropertyOptional()
    title: string;

    @Field()
    @ApiPropertyOptional()
    titlePl: string;

    @Field()
    @ApiPropertyOptional()
    titleEn: string;

    @Field()
    @ApiPropertyOptional()
    tags: string;

    @Field()
    @ApiPropertyOptional()
    tagsPl: string;

    @Field()
    @ApiPropertyOptional()
    tagsEn: string;

    constructor(component: ComponentEntity) {
        super(component);
        this.component = component.component;
        this.title = component.title;
        this.titlePl = component.titlePl;
        this.titleEn = component.titleEn;
        this.tags = component.tags;
        this.tagsPl = component.tagsPl;
        this.tagsEn = component.tagsEn;
    }
}
