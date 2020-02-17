import {
    Args,
    Query,
    Resolver,
    GraphQLExecutionContext,
    Context,
} from '@nestjs/graphql';
import { ComponentService } from './component.service';
import { SearchComponentDto } from './dto/SearchComponentDto';
import { SearchComponentPayloadDto } from './dto/SearchComponentPayloadDto';
import { ComponentDto } from './dto/ComponentDto';

@Resolver(of => ComponentDto)
export class ComponentResolver {
    constructor(private readonly componentService: ComponentService) {}

    @Query(returns => [SearchComponentPayloadDto])
    async search(
        @Args('phrase') phrase: string,
        @Args('noEnding') noEnding: boolean,
        @Args('lang') lang: string,
    ) {
        return await this.componentService.search(
            { phrase, noEnding },
            { lang },
        );
    }
}
