# Skeleton for NestJS + MySQL setup

1. Lets reconfiguration MySql server;
2. Reads all configurations from .evn;

## Steps to run
```
npm i 
cp .env.config .env
docker-compose up
```

If your do not want to mash logs do in separate consoles.

Console - 1
```
docker-com pose up mysql-db mysql-db-setup
```

Console - 2
```
docker-compose up api-server
```