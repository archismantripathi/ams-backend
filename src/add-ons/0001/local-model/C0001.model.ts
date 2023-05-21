/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const C0001Schema = new mongoose.Schema({
  deviceId:   { type: String,  required: true, unique: true },
  deviceType: { type: String,  required: true },
  data: { 
    state:      { type: Boolean, required: true },
    intensity:  { type: Number,  required: true },
  }
});

export interface C0001 extends mongoose.Document {
  id:         string ;
  deviceId:   string ;
  deviceType: string ;
  data: {
    state:     boolean,
    intensity: number
  }
}
