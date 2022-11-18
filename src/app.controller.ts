import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Payload, Transport } from '@nestjs/microservices'
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


@Controller('api/gateway')
export class AppController {

  private logger = new Logger(AppController.name);

  private client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        noAck: false,
        queue: 'credenciados-mapa',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  // @Post('criacategoria')
  // @UsePipes(ValidationPipe)
  // async criarCategoria(
  //   // @Body() criarCategoriaDto: CriarCategoriaDto) {
  //   @Body() criarCategoriaDto: any) {
  //   console.log(criarCategoriaDto)
  //   return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  // }

  @Post('teste')
  async teste(@Body() data: any): Promise<any> {
    let message = await firstValueFrom(this.client.send('viewingArea', data));
    message = JSON.stringify(message.data.response);
    console.log(message);
    return message;
  }
}
