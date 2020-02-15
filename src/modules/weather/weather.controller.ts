import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherPayloadDto } from './dto/WeatherPayloadDto';
import { WeatherService } from './weather.service';

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
