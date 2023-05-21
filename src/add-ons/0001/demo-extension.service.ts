import { BaseDeviceDto } from './dto/baseDevice.dto';
import { UpdateDeviceDataDto } from './dto/updateDeviceData.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoExtensionService {
  getStatus(deviceId: string) {
    return true;
  }

  updateDevice(deviceId: string, updateDeviceDataDto: UpdateDeviceDataDto) {
    return true;
  }

  addDevice(baseDeviceDto: BaseDeviceDto) {
    return true;
  }
}
