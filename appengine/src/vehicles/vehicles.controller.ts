import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatesService } from '../vehicle-states/vehicle-states.service';
import { Vehicle } from './vehicle.interface';
import { State } from '../vehicle-states/state.interface';
import { VehicleStatesController } from '../vehicle-states/vehicle-states.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
export class VehiclesController {

  constructor(private vehiclesSrv: VehiclesService, private statesSrv: VehicleStatesService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesSrv.findAll();
  }

  @Get(':vin')
  findOne(@Param('vin') vin): Promise<Vehicle> {
    return this.vehiclesSrv.findOne(vin);
  }

  @Get(':vin/last-states')
  getLastStates(@Param('vin') vin, @Query('count') count): Promise<State[]> {
    return this.statesSrv.getLastStatesByVin(vin, count);
  }

  // @Get(':id/drives')
  // findDrivesByVin(@Param('id') id): any {
  //   // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   return { text: `Get drives by vin - ${id}`};
  // }

  // @Post()
  // create(@Res() res, @Body() createVehicleDto: CreateVehicleDto): any {
  //   return res.status(HttpStatus.OK).json({ text: 'Create vehicle'});
  // }
}
