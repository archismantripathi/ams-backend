import { DemoExtensionService } from './demo-extension.service';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateDeviceDataDto } from './dto/updateDeviceData.dto';

@Controller('api/extension/0001')
export class DemoExtensionController {
  constructor(private readonly demoExtensionService: DemoExtensionService) {}

  @Get(':deviceId')
  getStatus(@Param('deviceId') deviceId: string) {
    return this.demoExtensionService.getStatus(deviceId);
  }

  @Patch(':deviceId')
  updateDevice(
    @Param('deviceId') deviceId: string,
    @Body() updateDeviceDataDto: UpdateDeviceDataDto,
  ) {
    return this.demoExtensionService.updateDevice(
      deviceId,
      updateDeviceDataDto,
    );
  }
}
