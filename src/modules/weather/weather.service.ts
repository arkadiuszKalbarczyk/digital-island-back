import { HttpService, Injectable } from '@nestjs/common';
import { ContextService } from '../../providers/context.service';
import { WeatherPayloadDto } from './dto/WeatherPayloadDto';

@Injectable()
export class WeatherService {
    private static _weather = 'weather_object';
    private static _refreshTime: number = new Date().getTime();

    constructor(private readonly httpService: HttpService) {}

    async getWeather(): Promise<any> {
        if ((new Date().getTime() - WeatherService._refreshTime) / 1000 > 2) {
            WeatherService._refreshTime = new Date().getTime();
            const { lat, lon } = { lat: 64.128288, lon: -21.827774 };
            const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${process.env.WEATHER_API_KEY}`;
            let newWeather;
            await this.httpService
                .get(weatherAPI)
                .toPromise()
                .then(r => {
                    newWeather = r.data;
                })
                .catch(e => {
                    console.info(e);
                    return WeatherService.getWeather();
                });
            WeatherService.setNewWeather(newWeather);
            return newWeather;
        }
        return WeatherService.getWeather();
    }

    static setNewWeather(newWeather: WeatherPayloadDto) {
        ContextService.set(WeatherService._weather, newWeather);
    }

    static getWeather(): any {
        const weather = ContextService.get(WeatherService._weather);
        return weather;
    }
}
