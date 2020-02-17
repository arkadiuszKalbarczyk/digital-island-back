import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ComponentEntity } from './component.entity';

@EntityRepository(ComponentEntity)
export class ComponentRepository extends Repository<ComponentEntity> {}
