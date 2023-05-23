import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoExtensionService } from './demo-extension.service';
import { DemoExtensionController } from './demo-extension.controller';
import { C0001Schema } from './local-model/C0001.model';
import { DeviceSchema } from '../../models/device.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'C0001', schema: C0001Schema }]),
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  providers: [DemoExtensionService],
  controllers: [DemoExtensionController],
})
export class DemoExtensionModule {}
