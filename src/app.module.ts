import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';


@Module({
  imports: [AppController, ClientsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
