import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('api/routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post()
  createRoutine(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routineService.createRoutine(createRoutineDto);
  }

  @Get()
  getAllRoutine() {
    return this.routineService.getAllRoutine();
  }

  @Get(':routineId')
  findOneRoutine(@Param('routineId') routineId: string) {
    return this.routineService.getRoutine(routineId);
  }

  @Patch(':routineId')
  updateRoutine(
    @Param('routineId') routineId: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
  ) {
    return this.routineService.updateRoutine(routineId, updateRoutineDto);
  }

  @Delete(':routineId')
  removeRoutine(@Param('routineId') routineId: string) {
    return this.routineService.removeRoutine(routineId);
  }
}
