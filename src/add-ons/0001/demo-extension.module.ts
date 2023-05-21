import { Module } from '@nestjs/common';
import { DemoExtensionService } from './demo-extension.service';
import { DemoExtensionController } from './demo-extension.controller';
import { DeviceSchema } from './local-model/device.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  providers: [DemoExtensionService],
  controllers: [DemoExtensionController],
})
export class DemoExtensionModule {}
