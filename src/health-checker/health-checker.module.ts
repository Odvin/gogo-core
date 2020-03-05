import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusOptionsService } from './terminus-options.service';

@Module({
  imports: [TerminusModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useClass: TerminusOptionsService,
  }),
  ]
})
export class HealthCheckerModule { }
