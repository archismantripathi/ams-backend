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
  @IsString()
  @IsNotEmpty()
  startTime: string;
  @IsString()
  @IsNotEmpty()
  endTime: string;
  @IsBoolean()
  @IsNotEmpty()
  state: boolean;
  @IsNumber()
  @IsNotEmpty()
  intensity: number;
}
