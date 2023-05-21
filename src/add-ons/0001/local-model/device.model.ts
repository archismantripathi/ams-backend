/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String,  required: true, unique: true },
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
