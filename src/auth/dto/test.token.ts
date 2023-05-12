/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class tokentest {
  @IsString()
  @IsNotEmpty()
  token: string;
}
