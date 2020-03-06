import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { HealthCheckerModule } from '../src/health-checker/health-checker.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('HealthCheckerModule (e2e) readiness', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HealthCheckerModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
            type: 'mysql',
            host: configService.get<string>('MYSQL_HOST'),
            port: configService.get<number>('MYSQL_PORT'),
            database: configService.get<string>('MYSQL_DATABASE'),
            username: configService.get<string>('MYSQL_USER'),
            password: configService.get<string>('MYSQL_PASSWORD'),
            synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
            entities: [__dirname + '/../**/*.entity.{ts,js}'],
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });


  it('/readiness (GET)', () => {
    return request(app.getHttpServer())
      .get('/readiness')
      .expect(200)
      .expect({
        status: 'ok',
        info: { 'DB connection': { status: 'up' } },
        details: { 'DB connection': { status: 'up' } }
      });
  });
})