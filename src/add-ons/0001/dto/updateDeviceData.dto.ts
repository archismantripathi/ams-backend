/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { BaseDeviceDto } from './baseDevice.dto';

export class UpdateDeviceDataDto extends PartialType(BaseDeviceDto) {}
