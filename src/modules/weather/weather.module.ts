import { HttpModule, Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherResolver } from './weather.resolver';

@Module({
    imports: [HttpModule],
    controllers: [WeatherController],
    providers: [WeatherService, WeatherResolver],
})
export class WeatherModule {}
