/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class SetDeviceDto {
  @IsNumber()
  @IsNotEmpty()
  intensity: number;
  @IsBoolean()
  @IsNotEmpty()
  state: boolean;
}