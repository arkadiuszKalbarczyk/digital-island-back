// tslint:disable: max-classes-per-file
// tslint:disable: variable-name
'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class WeatherMain {
    @ApiProperty({ type: Number })
    temp: number;
    @ApiProperty({ type: Number })
    feels_like: number;
    @ApiProperty({ type: Number })
    temp_min: number;
    @ApiProperty({ type: Number })
    temp_max: number;
    @ApiProperty({ type: Number })
    pressure: number;
    @ApiProperty({ type: Number })
    sea_level: number;
    @ApiProperty({ type: Number })
    grnd_level: number;
    @ApiProperty({ type: Number })
    humidity: number;
    @ApiProperty({ type: Number })
    temp_kf: number;
}

export class WeatherWeather {
    @ApiProperty({ type: Number })
    id: number;
    @ApiProperty({ type: String })
    main: string;
    @ApiProperty({ type: String })
    description: string;
    @ApiProperty({ type: String })
    icon: string;
}

export class WeatherClouds {
    @ApiProperty({ type: Number })
    all: number;
}

export class WeatherWind {
    @ApiProperty({ type: Number })
    speed: number;
    @ApiProperty({ type: Number })
    deg: number;
}

export class WeatherSys {
    @ApiProperty({ type: String })
    pod: string;
}

export class WeatherList {
    @ApiProperty({ type: Number })
    dt: number;
    @ApiProperty({ type: WeatherMain })
    main: WeatherMain;
    @ApiProperty({ type: [WeatherWeather] })
    weather: WeatherWeather[];
    @ApiProperty({ type: WeatherClouds })
    clouds: WeatherClouds;
    @ApiProperty({ type: WeatherWind })
    wind: WeatherWind;
    @ApiProperty({ type: WeatherSys })
    sys: WeatherSys;
    @ApiProperty({ type: String })
    dt_txt: string;
}

export class WeatherCoord {
    @ApiProperty({ type: Number })
    lat: number;
    @ApiProperty({ type: Number })
    lon: number;
}

export class WeatherCity {
    @ApiProperty({ type: Number })
    id: number;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: WeatherCoord })
    coord: WeatherCoord;
    @ApiProperty({ type: String })
    country: string;
    @ApiProperty({ type: Number })
    timezone: number;
    @ApiProperty({ type: Number })
    sunrise: number;
    @ApiProperty({ type: Number })
    sunset: number;
}

export class WeatherPayloadDto {
    @ApiProperty({ type: String })
    cod: string;
    @ApiProperty({ type: Number })
    message: number;
    @ApiProperty({ type: Number })
    cnt: number;
    @ApiProperty({ type: WeatherList })
    list: WeatherList[];
    @ApiProperty({ type: WeatherCity })
    city: WeatherCity;
}
