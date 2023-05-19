/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from '../../models/device.model';

@Injectable()
export class DeviceRepository {
  constructor(@InjectModel('Device') private readonly deviceModel: Model<Device>) {}

  async getAllDevice() {
    const devices = await this.deviceModel.find().exec();

    return devices.map((device) => ({
      deviceId:         device.deviceId,
      deviceName:       device.deviceName,
      deviceType:       device.deviceType,
      deviceConnector:  device.deviceConnector,
      deviceIp:         device.deviceIp,
      deviceStatus:     device.deviceStatus,
    }));
  }

  async getDevice(deviceId: string) {
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();

    if (device) {
      return {
        deviceId:         device.deviceId,
        deviceName:       device.deviceName,
        deviceType:       device.deviceType,
        deviceConnector:  device.deviceConnector,
        deviceIp:         device.deviceIp,
        deviceStatus:     device.deviceStatus,
      };
    } else {
      throw new NotFoundException('Device Not Found.');
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {

    const newDevice = new this.deviceModel({
      deviceId:          createDeviceDto.deviceId,
      deviceName:        createDeviceDto.deviceName,
      deviceDescription: createDeviceDto.deviceDescription,
      deviceType:        createDeviceDto.deviceType,
      deviceConnector:   createDeviceDto.deviceConnector,
      deviceIp:          createDeviceDto.deviceIp,
      deviceStatus:      createDeviceDto.deviceStatus,
    });

    try {
      await newDevice.save();
    } catch (error) {
      throw new NotAcceptableException('Device Already Exist.');
    }
    throw new HttpException('Device Created.', HttpStatus.CREATED);
  }

  async updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();
    if (device) {
      if (updateDeviceDto.deviceName) {
        device.deviceName = updateDeviceDto.deviceName;
      }
      if (updateDeviceDto.deviceConnector) {
        device.deviceConnector = updateDeviceDto.deviceConnector;
      }
      if (updateDeviceDto.deviceDescription) {
        device.deviceDescription = updateDeviceDto.deviceDescription;
      }
      if (updateDeviceDto.deviceType) {
        device.deviceType = updateDeviceDto.deviceType;
      }
      if (updateDeviceDto.deviceIp) {
        device.deviceIp = updateDeviceDto.deviceIp;
      }
      device.save();
      throw new HttpException('Device Updated.', HttpStatus.ACCEPTED);
    } else {
      throw new NotFoundException('Device Not Found.');
    }
  }

  async deleteDevice(deviceId: string) {
    const result = await this.deviceModel
      .deleteOne({ deviceId: deviceId })
      .exec();

    if (result.acknowledged == false) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else if (result.deletedCount == 0) {
      throw new NotFoundException('Device Not Found.');
    } else {
      throw new HttpException('Device Removed.', HttpStatus.ACCEPTED);
    }
  }
}
