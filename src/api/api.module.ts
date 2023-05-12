import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-nest-1', {
      useNewUrlParser: true,
    }),
    UserModule,
    DeviceModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class ApiModule {}
