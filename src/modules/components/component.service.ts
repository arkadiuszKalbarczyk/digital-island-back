import { Injectable } from '@nestjs/common';
import { ComponentEntity } from './component.entity';
import { ComponentRepository } from './component.repository';
import { ComponentDto } from './dto/ComponentDto';
import { SearchComponentDto } from './dto/SearchComponentDto';
import { AddComponentDto } from './dto/AddComponentDto';
import { SearchComponentPayloadDto } from './dto/SearchComponentPayloadDto';
import { SearchComponentHeaderDto } from './dto/SearchComponentHeaderDto';

@Injectable()
export class ComponentService {
    constructor(public readonly componentRepository: ComponentRepository) {}

    async search(
        searchComponentDto: SearchComponentDto,
        searchHeadersDto?: SearchComponentHeaderDto,
    ): Promise<SearchComponentPayloadDto[]> {
        const titlePostfix =
            searchHeadersDto &&
            (searchHeadersDto.lang === 'pl' || searchHeadersDto.lang === 'en')
                ? '_' + searchHeadersDto.lang
                : '';
        const select = `component, title${titlePostfix} as title`;
        const searchedColumns = [
            'component',
            'title',
            'title_pl',
            'title_en',
            'tags',
            'tags_pl',
            'tags_en',
        ];
        const tsvector = searchedColumns.join(` || ' ' || `);
        const tsquery =
            searchComponentDto.phrase
                .split(' ')
                .join(searchComponentDto.noEnding ? ':* | ' : ' | ') +
            (searchComponentDto.noEnding ? ':*' : '');
        const r = this.componentRepository.query(`
        SELECT ${select}
            FROM components
            WHERE to_tsvector(${tsvector}) @@ to_tsquery('${tsquery}');
        `);
        return await r;
    }

    async add(componentDto: AddComponentDto): Promise<ComponentDto> {
        const entity = await this.componentRepository.create(componentDto);
        return (await this.componentRepository.save(entity)).toDto();
    }
}
