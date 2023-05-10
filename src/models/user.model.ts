/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String,  required: true, unique: true },
  name:     { type: String,  required: true  },
  password: { type: String,  required: true  },
  admin:    { type: Boolean, required: false },
});

export interface User extends mongoose.Document {
  id:       string ;
  username: string ;
  name:     string ;
  password: string ;
  admin:    boolean;
}
