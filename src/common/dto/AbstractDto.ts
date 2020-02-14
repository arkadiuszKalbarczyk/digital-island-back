'use strict';

import { AbstractEntity } from '../abstract.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AbstractDto {
    @Field()
    id: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    constructor(entity: AbstractEntity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
