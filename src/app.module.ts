import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmocrmModule } from './amocrm/amocrm.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    AmocrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    })
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
