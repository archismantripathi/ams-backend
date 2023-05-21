import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { AddOnsModule } from './add-ons/add-ons.module';

@Module({
  imports: [ApiModule, ClientModule, AuthModule, AddOnsModule],
})
export class AppModule {}
