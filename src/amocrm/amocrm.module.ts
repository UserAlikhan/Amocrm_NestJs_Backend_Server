import { Module } from '@nestjs/common';
import { AmocrmController } from './amocrm.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from '../config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        })
    ],
    controllers: [AmocrmController],
    providers: [ConfigService],
})
export class AmocrmModule {}
