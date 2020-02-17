import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { ComponentDto } from './dto/ComponentDto';

@Entity({ name: 'components' })
export class ComponentEntity extends AbstractEntity<ComponentDto> {
    @Column({ nullable: false })
    component: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    titlePl: string;

    @Column({ nullable: false })
    titleEn: string;

    @Column({ nullable: false })
    tags: string;

    @Column({ nullable: false })
    tagsPl: string;

    @Column({ nullable: false })
    tagsEn: string;

    dtoClass = ComponentDto;
}
