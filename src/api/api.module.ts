import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-nest-1', {
      useNewUrlParser: true,
    }),
    UserModule,
    DeviceModule,
  ],
})
export class ApiModule {}
