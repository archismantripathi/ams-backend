/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from 'src/models/routine.model';

@Injectable()
export class RoutineRepository {
  constructor(
    @InjectModel('Routine') private readonly routineModel: Model<Routine>,
  ) {}

  async getAllRoutine() {
    const routines = await this.routineModel.find().exec();
    return routines.map((routine) => ({
      routineId:          routine.routineId,
      routineName:        routine.routineName,
      routineDescription: routine.routineDescription,
      routineConnector:   routine.routineConnector,
      routineDevice:      routine.routineDevice,
      startTime:          routine.trigger.startTime,
      endTime:            routine.trigger.endTime,
      state:              routine.routineData.state,
      intensity:          routine.routineData.intensity,
    }));
  }

  async getRoutine (routineId: string) {
    const routine = await this.routineModel.findOne({ routineId: routineId }).exec();
    return {
        routineId:          routine.routineId,
        routineName:        routine.routineName,
        routineDescription: routine.routineDescription,
        routineConnector:   routine.routineConnector,
        routineDevice:      routine.routineDevice,
        startTime:          routine.trigger.startTime,
        endTime:            routine.trigger.endTime,
        state:              routine.routineData.state,
        intensity:          routine.routineData.intensity,
    };
  }
  
  async createRoutine(createRoutineDto: CreateRoutineDto) {
    const newRoutine = new this.routineModel({
      routineId:          createRoutineDto.routineId,
      routineName:        createRoutineDto.routineName,
      routineDescription: createRoutineDto.routineDescription,
      routineConnector:   createRoutineDto.routineConnector,
      routineDevice:      createRoutineDto.routineDevice,
      trigger:     {
        startTime: createRoutineDto.startTime,
        endTime:   createRoutineDto.endTime,
      },
      routineData: { 
        state:     createRoutineDto.state,
        intensity: createRoutineDto.intensity,
      }
    });
    try {
      await newRoutine.save();
    } catch (error) {
      throw new NotAcceptableException('⚠️ Routine Already Exist.');
    }
    throw new HttpException('✅ Routine Created.', HttpStatus.CREATED);
  }


  async deleteRoutine(routineId: string) {
    const result = await this.routineModel
        .deleteOne({ routineId: routineId })
        .exec();
    if (result.acknowledged == false) {
        throw new HttpException(
        'Internal Server Error',
        HttpStatus.SERVICE_UNAVAILABLE,
        );
    } else if (result.deletedCount == 0) {
        throw new NotFoundException('⚠️ Routine Not Found.');
    } else {
        throw new HttpException('⚠️ Routine Erased.', HttpStatus.ACCEPTED);
    }
  }

  async updateRoutine(routineId: string, updateRoutineDto: UpdateRoutineDto) {
    const routine = await this.routineModel.findOne({ routineId: routineId }).exec();
    if (routine) {
      if ( updateRoutineDto.routineName ) {
        routine.routineName = updateRoutineDto.routineName;
      }
      if ( updateRoutineDto.routineDescription ) {
        routine.routineDescription = updateRoutineDto.routineDescription;
      }
      if ( updateRoutineDto.startTime ) {
        routine.trigger.startTime = updateRoutineDto.startTime;
      }
      if ( updateRoutineDto.endTime ) {
        routine.trigger.endTime = updateRoutineDto.endTime;
      }
      if ( updateRoutineDto.state ) {
        routine.routineData.state = updateRoutineDto.state;
      }
      if ( updateRoutineDto.intensity ) {
        routine.routineData.intensity = updateRoutineDto.intensity;
      }
      routine.save();
      throw new HttpException('✅ Routine Updated.', HttpStatus.ACCEPTED);
    } else {
      throw new NotFoundException('⚠️ Routine Not Found.');
    }
  }
}