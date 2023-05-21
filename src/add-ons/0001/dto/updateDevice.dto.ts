/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './createDevice.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}
