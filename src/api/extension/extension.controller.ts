import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { CreateExtensionDto } from './dto/create-extension.dto';
import { UpdateExtensionDto } from './dto/update-extension.dto';

@Controller('api/extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Get()
  getAllExtension() {
    return this.extensionService.getAllExtension();
  }

  @Get(':extensionId')
  getExtension(@Param('extensionId') extensionId: string) {
    return this.extensionService.getExtension(extensionId);
  }

  @Post()
  createExtension(@Body() createExtensionDto: CreateExtensionDto) {
    return this.extensionService.createExtension(createExtensionDto);
  }

  @Patch(':extensionId')
  updateExtension(
    @Param('extensionId') extensionId: string,
    @Body() updateExtensionDto: UpdateExtensionDto,
  ) {
    return this.extensionService.updateExtension(
      extensionId,
      updateExtensionDto,
    );
  }

  @Delete(':extensionId')
  deleteExtension(@Param('extensionId') extensionId: string) {
    return this.extensionService.deleteExtension(extensionId);
  }
}
