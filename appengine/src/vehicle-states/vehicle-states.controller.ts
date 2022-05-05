import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import * as moment from 'moment';

import { VehicleStatesService } from './vehicle-states.service';
import { State } from './state.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DrivingDataDto } from './dto/driving-data.dto';
import { CacheService } from '../cache/cache.service';

@Controller('vehicle-states')
@UseGuards(JwtAuthGuard)
export class VehicleStatesController {

  constructor(private statesSrv: VehicleStatesService, private cache: CacheService) {}

  /**
   * GET last vehicleStates by vehicle identifier (vin)
   * @param vin
   * @param count
   * @return {Promise<State[]>}
   */
  @Get(':vin')
  getLastStates(@Param('vin') vin, @Query('count') count): Promise<State[]> {
    return this.statesSrv.getLastStatesByVin(vin, count);
  }

  /**
   * GET states by charge id
   * @param {string} vin
   * @param {string} id
   * @return {Promise<Object[]>}
   */
  @Get(':vin/charging/:charge_id')
  @UseInterceptors(CacheInterceptor)
  getStatesByChargeId(@Param('vin') vin: string, @Param('charge_id') id: string): Promise<{[k:string]: any}[]> {
    // console.log(this.cache.getDataByKey(`/api/vehicle-states/${vin}/charging/202004010456-WAUZZZGE7LB002014`));
    return this.statesSrv.getStatesByChargeId(id);
  }

  /**
   * GET driving data from specified period
   * @param {string} vin
   * @param {DrivingDataDto} q
   * @return {Promise<Object[]>}
   */
  @Get(':vin/driving')
  getDrivingData(@Param('vin') vin: string, @Query() q: DrivingDataDto): Promise<{[k:string]: any}[]> {
    const { from, limit } = q;
    const date = moment(from, "YYYYMMDD-HHmm").toDate();
    return this.statesSrv.getDrivingDataFromDate(vin, date, +limit);
  }

  /**
   * GET states by drive id
   * @param {string} vin
   * @param {string} id
   * @return {Promise<Object[]>}
   */
  @Get(':vin/driving/:drive_id')
  getStatesByDriveId(@Param('vin') vin: string, @Param('drive_id') id: string): Promise<{[k:string]: any}[]> {
    return this.statesSrv.getStatesByDriveId(id);
  }

}
