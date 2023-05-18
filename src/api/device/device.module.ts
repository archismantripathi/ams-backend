import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { DeviceSchema } from './../../models/device.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
