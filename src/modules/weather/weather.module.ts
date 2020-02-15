import { HttpModule, Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
    imports: [HttpModule],
    controllers: [WeatherController],
    providers: [WeatherService],
})
export class WeatherModule {}
