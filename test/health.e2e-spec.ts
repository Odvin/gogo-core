import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HealthCheckerModule } from '../src/health-checker/health-checker.module';
import { INestApplication } from '@nestjs/common';

describe('HealthCheckerModule (e2e) liveness @ memory-health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [HealthCheckerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/liveness (GET)', () => {
    return request(app.getHttpServer())
      .get('/liveness')
      .expect(200)
      .expect({
        status: 'ok',
        info: { 'External connection': { status: 'up' } },
        details: { 'External connection': { status: 'up' } }
      });
  });

  it('/memory-health (GET)', () => {
    return request(app.getHttpServer())
      .get('/memory-health')
      .expect(200)
      .expect({
        status: 'ok',
        info: {
          'memory_heap': { status: 'up' },
          'memory_rss': { status: 'up' }
        },
        details: {
          'memory_heap': { status: 'up' },
          'memory_rss': { status: 'up' }
        }
      });
  });
});