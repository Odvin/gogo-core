import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'

//ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '132465';

// flush privileges;

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'mysql-db',
      port: 3306,
      username: 'root',
      password: '132465',
      database: 'gg',
      entities: [],
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
