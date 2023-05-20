/* eslint-disable prettier/prettier */
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  
  import { CreateExtensionDto } from './dto/create-extension.dto';
  import { UpdateExtensionDto } from './dto/update-extension.dto';
  import { Extension } from '../../models/extension.model';
  
  @Injectable()
  export class ExtensionRepository {
    constructor(@InjectModel('Extension') private readonly extensionModel: Model<Extension>) {}
  
    async getAllExtension() {
      const extensions = await this.extensionModel.find().exec();
  
      return extensions.map((extension) => ({
        extensionId:          extension.extensionId,
        extensionName:        extension.extensionName,
        extensionDescription: extension.extensionDescription,
      }));
    }
  
    async getExtension(extensionId: string) {
      const extension = await this.extensionModel.findOne({ extensionId: extensionId }).exec();
  
      if (extension) {
        return {
          extensionId:          extension.extensionId,
          extensionName:        extension.extensionName,
          extensionDescription: extension.extensionDescription,
        };
      } else {
        throw new NotFoundException('Extension Not Found.');
      }
    }
  
    async createExtension(createExtensionDto: CreateExtensionDto) {
      throw new HttpException('Function Not Implemented.', HttpStatus.NOT_IMPLEMENTED);
    }
  
    async updateExtension(extensionId: string, updateExtensionDto: UpdateExtensionDto) {
      throw new HttpException('Function Not Implemented.', HttpStatus.NOT_IMPLEMENTED);
    }
  
    async deleteExtension(extensionId: string) {
      throw new HttpException('Can\'t be deleted.', HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
  