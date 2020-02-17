import {
    Body,
    Headers,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RoleType } from '../../common/constants/role-type';
import { ComponentService } from './component.service';
import { ComponentDto } from './dto/ComponentDto';
import { SearchComponentDto } from './dto/SearchComponentDto';
import { AddComponentDto } from './dto/AddComponentDto';
import { SearchComponentPayloadDto } from './dto/SearchComponentPayloadDto';
import { SearchComponentHeaderDto } from './dto/SearchComponentHeaderDto';

@Controller('component')
@ApiTags('component')
export class ComponentController {
    private readonly _logger = new Logger(ComponentController.name);
    constructor(public readonly componentService: ComponentService) {}

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: [ComponentDto],
        description: 'Search in components result',
    })
    search(
        @Body() searchComponentDto: SearchComponentDto,
        @Headers() searchHeadersDto: SearchComponentHeaderDto,
    ): Promise<SearchComponentPayloadDto[]> {
        return this.componentService.search(
            searchComponentDto,
            searchHeadersDto,
        );
    }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(AuthUserInterceptor)
    @ApiBearerAuth()
    @Roles(RoleType.ADMIN)
    @ApiOkResponse({
        type: ComponentDto,
        description: 'Add component to db',
    })
    add(@Body() componentDto: AddComponentDto): Promise<ComponentDto> {
        return this.componentService.add(componentDto);
    }
}
