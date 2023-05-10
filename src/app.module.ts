import { Module } from '@nestjs/common';

import { ClientModule } from './client/client.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, ClientModule],
})
export class AppModule {}
