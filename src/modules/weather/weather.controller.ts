import {
    Controller,
    Logger,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { WeatherService } from './weather.service';
import { WeatherPayloadDto } from './dto/WeatherPayloadDto';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
    private readonly _logger = new Logger(WeatherController.name);
    constructor(public readonly weatherService: WeatherService) {}

    @Get('get')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: WeatherPayloadDto,
        description: 'Weather info',
    })
    async weatherInfo(): Promise<WeatherPayloadDto> {
        console.info('weatherInfo');
        return this.weatherService.getWeather();
    }
}
