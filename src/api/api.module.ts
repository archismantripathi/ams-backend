/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ExtensionModule } from './extension/extension.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test-nest-1', {
      useNewUrlParser: true,
    }),
    UserModule,
    DeviceModule,
    ExtensionModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class ApiModule {}
