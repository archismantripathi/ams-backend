import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;
  @IsString()
  @IsNotEmpty()
  deviceName: string;
  @IsString()
  deviceDescription: string;
  @IsString()
  @IsNotEmpty()
  deviceIp: string;
}
