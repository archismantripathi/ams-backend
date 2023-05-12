import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ApiModule, ClientModule, AuthModule],
})
export class AppModule {}
