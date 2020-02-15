// tslint:disable: max-classes-per-file
// tslint:disable: variable-name
'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from 'type-graphql';
import { WeatherService } from '../weather.service';

@ObjectType()
export class WeatherMain {
    @Field()
    @ApiProperty({ type: Number })
    temp: number;
    @Field()
    @ApiProperty({ type: Number })
    feels_like: number;
    @Field()
    @ApiProperty({ type: Number })
    temp_min: number;
    @Field()
    @ApiProperty({ type: Number })
    temp_max: number;
    @Field()
    @ApiProperty({ type: Number })
    pressure: number;
    @Field()
    @ApiProperty({ type: Number })
    sea_level: number;
    @Field()
    @ApiProperty({ type: Number })
    grnd_level: number;
    @Field()
    @ApiProperty({ type: Number })
    humidity: number;
    @Field()
    @ApiProperty({ type: Number })
    temp_kf: number;
}

@ObjectType()
export class WeatherWeather {
    @Field()
    @ApiProperty({ type: Number })
    id: number;
    @Field()
    @ApiProperty({ type: String })
    main: string;
    @Field()
    @ApiProperty({ type: String })
    description: string;
    @Field()
    @ApiProperty({ type: String })
    icon: string;
}

@ObjectType()
export class WeatherClouds {
    @Field()
    @ApiProperty({ type: Number })
    all: number;
}

@ObjectType()
export class WeatherWind {
    @Field()
    @ApiProperty({ type: Number })
    speed: number;
    @Field()
    @ApiProperty({ type: Number })
    deg: number;
}

@ObjectType()
export class WeatherSys {
    @Field()
    @ApiProperty({ type: String })
    pod: string;
}

@ObjectType()
export class WeatherList {
    @Field()
    @ApiProperty({ type: Number })
    dt: number;
    @Field()
    @ApiProperty({ type: WeatherMain })
    main: WeatherMain;
    @Field(type => [WeatherWeather])
    @ApiProperty({ type: [WeatherWeather] })
    weather: WeatherWeather[];
    @Field()
    @ApiProperty({ type: WeatherClouds })
    clouds: WeatherClouds;
    @Field()
    @ApiProperty({ type: WeatherWind })
    wind: WeatherWind;
    @Field()
    @ApiProperty({ type: WeatherSys })
    sys: WeatherSys;
    @Field()
    @ApiProperty({ type: String })
    dt_txt: string;
}

@ObjectType()
export class WeatherCoord {
    @Field()
    @ApiProperty({ type: Number })
    lat: number;
    @Field()
    @ApiProperty({ type: Number })
    lon: number;
}

@ObjectType()
export class WeatherCity {
    @Field()
    @ApiProperty({ type: Number })
    id: number;
    @Field()
    @ApiProperty({ type: String })
    name: string;
    @Field()
    @ApiProperty({ type: WeatherCoord })
    coord: WeatherCoord;
    @Field()
    @ApiProperty({ type: String })
    country: string;
    @Field()
    @ApiProperty({ type: Number })
    timezone: number;
    @Field()
    @ApiProperty({ type: Number })
    sunrise: number;
    @Field()
    @ApiProperty({ type: Number })
    sunset: number;
}

@ObjectType()
export class WeatherPayloadDto {
    @Field()
    @ApiProperty({ type: String })
    cod: string;
    @Field()
    @ApiProperty({ type: Number })
    message: number;
    @Field()
    @ApiProperty({ type: Number })
    cnt: number;
    @Field(type => [WeatherList])
    @ApiProperty({ type: [WeatherList] })
    list: WeatherList[];
    @Field()
    @ApiProperty({ type: WeatherCity })
    city: WeatherCity;
}
