import { Injectable } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutineRepository } from './routine.repository';

@Injectable()
export class RoutineService {
  constructor(private readonly routineRepository: RoutineRepository) {}

  async createRoutine(createRoutineDto: CreateRoutineDto) {
    return this.routineRepository.createRoutine(createRoutineDto);
  }

  async getAllRoutine() {
    return { data: await this.routineRepository.getAllRoutine() };
  }

  async getRoutine(routineId: string) {
    return { data: await this.routineRepository.getRoutine(routineId) };
  }

  updateRoutine(routineId: string, updateRoutineDto: UpdateRoutineDto) {
    return this.routineRepository.updateRoutine(routineId, updateRoutineDto);
  }

  removeRoutine(routineId: string) {
    return this.routineRepository.deleteRoutine(routineId);
  }
}
