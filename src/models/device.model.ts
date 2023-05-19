/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  deviceId:          { type: String,  required: true, unique: true },
  deviceName:        { type: String,  required: true },
  deviceDescription: { type: String,  required: true },
  deviceType:        { type: String,  required: true },
  deviceConnector:   { type: String,  required: true },
  deviceIp:          { type: String,  required: true },
  deviceStatus:      { type: Boolean, required: true },
});

export interface Device extends mongoose.Document {
  id:                string ;
  deviceId:          string ;
  deviceName:        string ;
  deviceDescription: string ;
  deviceType:        string ;
  deviceConnector:   string ;
  deviceIp:          string ;
  deviceStatus:      boolean;
}
