import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from './router/router.module';
import 'dotenv/config'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule,

  ],
})

export class AppModule { }
