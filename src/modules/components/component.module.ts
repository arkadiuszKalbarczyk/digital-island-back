import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentController } from './component.controller';
import { ComponentRepository } from './component.repository';
import { ComponentService } from './component.service';
import { ComponentResolver } from './component.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([ComponentRepository])],
    controllers: [ComponentController],
    providers: [ComponentService, ComponentResolver],
})
export class ComponentModule {}
