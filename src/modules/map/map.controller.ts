import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Controller()
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @MessagePattern('createMap')
  create(@Payload() createMapDto: CreateMapDto) {
    return this.mapService.create(createMapDto);
  }

  @MessagePattern('findAllMap')
  findAll() {
    return this.mapService.findAll();
  }

  @MessagePattern('findOneMap')
  findOne(@Payload() id: number) {
    return this.mapService.findOne(id);
  }

  @MessagePattern('updateMap')
  update(@Payload() updateMapDto: UpdateMapDto) {
    return this.mapService.update(updateMapDto.id, updateMapDto);
  }

  @MessagePattern('removeMap')
  remove(@Payload() id: number) {
    return this.mapService.remove(id);
  }
}
