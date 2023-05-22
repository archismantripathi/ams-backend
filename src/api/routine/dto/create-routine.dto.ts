import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateRoutineDto {
  @IsString()
  @IsNotEmpty()
  routineId: string;
  @IsString()
  @IsNotEmpty()
  routineName: string;
  @IsString()
  routineDescription: string;
  @IsString()
  @IsNotEmpty()
  routineConnector: string;
  @IsString()
  @IsNotEmpty()
  routineDevice: string;
  @IsNumber()
  @IsNotEmpty()
  startTime: number;
  @IsNumber()
  @IsNotEmpty()
  endTime: number;
  @IsBoolean()
  @IsNotEmpty()
  state: boolean;
  @IsNumber()
  @IsNotEmpty()
  intensity: number;
}
