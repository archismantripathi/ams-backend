import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BaseDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;
  @IsString()
  @IsNotEmpty()
  deviceName: string;
  @IsString()
  @IsNotEmpty()
  deviceDescription: string;
  @IsString()
  @IsNotEmpty()
  deviceType: string;
  @IsString()
  @IsNotEmpty()
  deviceConnector: string;
  @IsString()
  @IsNotEmpty()
  deviceIp: string;
  @IsBoolean()
  @IsNotEmpty()
  deviceStatus: boolean;
}
