import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoExtensionModule } from './0001/demo-extension.module';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ams-beta-v1', {
      useNewUrlParser: true,
    }),
    DemoExtensionModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AddOnsModule {}
