import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceRepository } from './device.repository';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async getAllDevice() {
    return { data: await this.deviceRepository.getAllDevice() };
  }

  async getDevice(deviceId: string) {
    return { data: await this.deviceRepository.getDevice(deviceId) };
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.createDevice(createDeviceDto);
  }

  async updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceRepository.updateDevice(deviceId, updateDeviceDto);
  }

  async deleteDevice(deviceId: string) {
    return this.deviceRepository.deleteDevice(deviceId);
  }
}
