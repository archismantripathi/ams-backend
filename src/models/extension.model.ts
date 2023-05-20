/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ExtensionSchema = new mongoose.Schema({
  extensionId:          { type: String,  required: true, unique: true },
  extensionName:        { type: String,  required: true },
  extensionDescription: { type: String,  required: true },
});

export interface Extension extends mongoose.Document {
  id:                   string ;
  extensionId:          string ;
  extensionName:        string ;
  extensionDescription: string ;
}
