/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from 'src/models/device.model';
import { ExtensionRepository } from './extension.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  controllers: [ExtensionController],
  providers: [ExtensionService, ExtensionRepository],
})
export class ExtensionModule {}
