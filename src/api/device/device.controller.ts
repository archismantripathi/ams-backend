import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('api/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  getAllDevice() {
    return this.deviceService.getAllDevice();
  }

  @Get(':deviceId')
  getDevice(@Param('deviceId') deviceId: string) {
    return this.deviceService.getDevice(deviceId);
  }

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @Patch(':deviceId')
  updateDevice(
    @Param('deviceId') deviceId: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceService.updateDevice(deviceId, updateDeviceDto);
  }

  @Delete(':deviceId')
  deleteDevice(@Param('deviceId') deviceId: string) {
    return this.deviceService.deleteDevice(deviceId);
  }
}
