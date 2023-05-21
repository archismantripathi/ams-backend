/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateDeviceDto } from './dto/createDevice.dto';
import { UpdateDeviceDto } from './dto/updateDevice.dto';

import { Device } from '../../models/device.model';
import { C0001 } from './local-model/C0001.model';

@Injectable()
export class DemoExtensionService {
  constructor(
    @InjectModel('Device') private readonly deviceModel: Model<Device>,
    @InjectModel('C0001') private readonly C0001Model: Model<C0001>,
  ) {}

  getStatus(deviceId: string) {
    return true;
  }

  async updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();
    if (device) {
      if (updateDeviceDto.deviceName) {
        device.deviceName = updateDeviceDto.deviceName;
      }

      if (updateDeviceDto.deviceDescription) {
        device.deviceDescription = updateDeviceDto.deviceDescription;
      }

      if (updateDeviceDto.deviceIp) {
        device.deviceIp = updateDeviceDto.deviceIp;
      }

      device.save();
      throw new HttpException('✅ Device Updated.', HttpStatus.ACCEPTED);
    } else {
      throw new NotFoundException('⚠️ Device Not Found.');
    }
  }

  async addDevice(deviceType: string, createDeviceDto: CreateDeviceDto) {
    const newDevice = new this.deviceModel({
      deviceId:          createDeviceDto.deviceId,
      deviceName:        createDeviceDto.deviceName,
      deviceDescription: createDeviceDto.deviceDescription,
      deviceType:        deviceType,
      deviceConnector:   '0001',
      deviceIp:          createDeviceDto.deviceIp,
      deviceStatus:      true,
    });
    try {
      await newDevice.save();
    } catch (error) {
      console.log(error);
      throw new NotAcceptableException('Device Already Exist.');
    }
    const newC0001Entry = new this.C0001Model({
      deviceId:          createDeviceDto.deviceId,
      deviceType:        deviceType,
      data: {
        state:     false,
        intensity: 100
      }
    });
    try {
      await newC0001Entry.save();
    } catch (error) {
      throw new HttpException('⚠️ Unknown Error. Re-add Device.', HttpStatus.PARTIAL_CONTENT);
    }
    throw new HttpException('✅ Device Created.', HttpStatus.CREATED);
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
      throw new NotFoundException('⚠️ Device Not Found.');
    }
    const resultC0001 = await this.C0001Model
      .deleteOne({ deviceId: deviceId })
      .exec();

    if (resultC0001.acknowledged == false) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else if (resultC0001.deletedCount == 0) {
      throw new NotFoundException('⚠️ Device Not Found.');
    }
    throw new HttpException('⚠️ Device Removed.', HttpStatus.ACCEPTED);
  }
}
