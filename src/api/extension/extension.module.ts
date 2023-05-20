import { Module } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/models/device.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  controllers: [ExtensionController],
  providers: [ExtensionService]
})
export class ExtensionModule {}
