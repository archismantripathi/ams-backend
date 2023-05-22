import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineRepository } from './routine.repository';

@Injectable()
export class RoutineService {
  constructor(private readonly routineRepository: RoutineRepository) {}

  createRoutine(createRoutineDto: CreateRoutineDto) {
    return this.routineRepository.createRoutine(createRoutineDto);
  }

  getAllRoutine() {
    return this.routineRepository.getAllRoutine();
  }

  getRoutine(routineId: string) {
    return this.routineRepository.getRoutine(routineId);
  }

  updateRoutine(routineId: string, updateRoutineDto: UpdateRoutineDto) {
    return this.routineRepository.updateRoutine(routineId, updateRoutineDto);
  }

  removeRoutine(routineId: string) {
    return this.routineRepository.deleteRoutine(routineId);
  }
}
