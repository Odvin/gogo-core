import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  TerminusModuleOptions
} from '@nestjs/terminus';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  memoryHeap = this.configService.get<number>('MEMORY_HEAP_LIMIT');
  memoryRss = this.configService.get<number>('MEMORY_RSS_LIMIT');

  createTerminusOptions(): TerminusModuleOptions {
    const dnsHealthEndpoint: TerminusEndpoint = {
      url: '/liveness',
      healthIndicators: [
        async () => this.dns.pingCheck('External connection', 'https://google.com'),
      ],
    };

    const dbHealthEndpoint: TerminusEndpoint = {
      url: '/readiness',
      healthIndicators: [
        async () => this.db.pingCheck('DB connection', { timeout: 1000 })
      ],
    };

    const memoryHealthEndpoint: TerminusEndpoint = {
      url: '/memory-health',
      healthIndicators: [
        async () => this.memory.checkHeap('memory_heap', this.memoryHeap),
        async () => this.memory.checkRSS('memory_rss', this.memoryRss),
      ],
    };

    return {
      endpoints: [dnsHealthEndpoint, dbHealthEndpoint, memoryHealthEndpoint],
    };
  }
}