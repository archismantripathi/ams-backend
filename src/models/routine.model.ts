/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const RoutineSchema = new mongoose.Schema({
  routineId:          { type: String,  required: true, unique: true },
  routineName:        { type: String,  required: true },
  routineDescription: { type: String },
  routineConnector:   { type: String,  required: true },
  routineDevice:      { type: String,  required: true },
  trigger:     {
    startTime: { type: String,    required: true },
    endTime:   { type: String,    required: true },
  },
  routineData: { 
    state:     { type: Boolean, required: true },
    intensity: { type: Number,  required: true },
  },
  routinePreviousData: { 
    state:     { type: Boolean },
    intensity: { type: Number  },
  }
});

export interface Routine extends mongoose.Document {
  id:                 string ;
  routineId:          string ;
  routineName:        string ;
  routineDescription: string ;
  routineConnector:   string ;
  routineDevice:      string ;
  trigger:     {
    startTime: string,
    endTime:   string,
  };
  routineData: { 
    state:     boolean,
    intensity: number
  };
  routinePreviousData: { 
    state:     boolean,
    intensity: number
  };
}
