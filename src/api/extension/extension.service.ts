import { Injectable } from '@nestjs/common';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';
import { ExtensionRepository } from './extension.repository';

@Injectable()
export class ExtensionService {
  constructor(private readonly extensionRepository: ExtensionRepository) {}

  async getAllExtension() {
    return { data: await this.extensionRepository.getAllExtension() };
  }

  async getExtension(extensionId: string) {
    return { data: await this.extensionRepository.getExtension(extensionId) };
  }

  async createExtension(createExtensionDto: CreateExtensionDto) {
    return this.extensionRepository.createExtension(createExtensionDto);
  }

  async updateExtension(
    extensionId: string,
    updateExtensionDto: UpdateExtensionDto,
  ) {
    return this.extensionRepository.updateExtension(
      extensionId,
      updateExtensionDto,
    );
  }

  async deleteExtension(extensionId: string) {
    return this.extensionRepository.deleteExtension(extensionId);
  }
}
