import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ResolveProperty, Parent } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { WeatherPayloadDto } from './dto/WeatherPayloadDto';

@Resolver(of => WeatherPayloadDto)
export class WeatherResolver {
    constructor(private readonly weatherService: WeatherService) {}

    @Query(returns => WeatherPayloadDto)
    async getWeather() {
        return await this.weatherService.getWeather();
    }
}
