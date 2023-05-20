/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtensionRepository } from './extension.repository';
import { ExtensionSchema } from '../../models/extension.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Extension', schema: ExtensionSchema }]),
  ],
  controllers: [ExtensionController],
  providers: [ExtensionService, ExtensionRepository],
})
export class ExtensionModule {}
