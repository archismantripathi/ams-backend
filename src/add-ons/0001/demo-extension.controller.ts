import { DemoExtensionService } from './demo-extension.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/createDevice.dto';
import { UpdateDeviceDto } from './dto/updateDevice.dto';
import { SetDeviceDto } from './dto/setDevice.dto';

@Controller('api/extension/0001')
export class DemoExtensionController {
  constructor(private readonly demoExtensionService: DemoExtensionService) {}

  @Get()
  getAllLocal() {
    return this.demoExtensionService.getAllLocal();
  }

  @Get(':deviceId')
  getStatus(@Param('deviceId') deviceId: string) {
    return this.demoExtensionService.getStatus(deviceId);
  }

  @Patch('set/:deviceId')
  setDevice(
    @Param('deviceId') deviceId: string,
    @Body() setDeviceDto: SetDeviceDto,
  ) {
    return this.demoExtensionService.setDevice(deviceId, setDeviceDto);
  }

  @Post(':deviceType')
  newDevice(
    @Param('deviceType') deviceType: string,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.demoExtensionService.addDevice(deviceType, createDeviceDto);
  }

  @Patch(':deviceId')
  updateDevice(
    @Param('deviceId') deviceId: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.demoExtensionService.updateDevice(deviceId, updateDeviceDto);
  }

  @Delete(':deviceId')
  deleteDevice(@Param('deviceId') deviceId: string) {
    return this.demoExtensionService.deleteDevice(deviceId);
  }
}
