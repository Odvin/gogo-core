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
docker-compose up mysql-db mysql-db-setup
```

Console - 2
```
docker-compose up api-server
```

## Data storage model
![ER-diagram](/docs/pic/gogo-core-ER.png)

## API Routes
__GET Requests__
```
host:port/games?filter
host:port/liveness
host:port/readiness
host:port/memory-health
```

__POST Requests__
```
host:port/users/signup
host:port/users/signin
host:port/games
host:port/games/users
```

__PATCH Requests__
```
host:port/users/info
host:port/games/{id}/status
```

## e2e tests
Enter into the container
```
 docker exec -it gogo_api bash
 ```

 Run tests 
 ```
 npm run test:e2e
 ```