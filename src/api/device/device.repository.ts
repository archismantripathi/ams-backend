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
      deviceId: device.deviceId,
      deviceName: device.deviceName,
      deviceStatus: device.deviceStatus,
    }));
  }

  async getDevice(deviceId: string) {
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();

    if (device) {
      return {
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        deviceStatus: device.deviceStatus,
      };
    } else {
      throw new NotFoundException('Device Not Found.');
    }
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {

    const newDevice = new this.deviceModel({
      deviceId: createDeviceDto.deviceId,
      deviceName: createDeviceDto.deviceName,
      deviceStatus: createDeviceDto.deviceStatus,
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
      if (updateDeviceDto.deviceId) {
        if (device.deviceId != updateDeviceDto.deviceId) {
          const checkNewDeviceName = await this.deviceModel
            .findOne({
              deviceId: updateDeviceDto.deviceId,
            })
            .exec();
          if (checkNewDeviceName) {
            throw new HttpException(
              'DevicedeviceName Must Be Unique.',
              HttpStatus.CONFLICT,
            );
          } else {
            device.deviceId = updateDeviceDto.deviceId;
          }
        }
      }
      if (updateDeviceDto.deviceName) {
        device.deviceName = updateDeviceDto.deviceName;
      }
      if (updateDeviceDto) {
  
      }
      if (updateDeviceDto.deviceStatus) {
        device.deviceStatus = updateDeviceDto.deviceStatus;
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
