import { Module } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { RoutineController } from './routine.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineSchema } from 'src/models/routine.model';
import { RoutineRepository } from './routine.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Routine', schema: RoutineSchema }]),
  ],
  controllers: [RoutineController],
  providers: [RoutineService, RoutineRepository],
})
export class RoutineModule {}
