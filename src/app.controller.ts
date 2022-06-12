import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Payload, Transport } from '@nestjs/microservices'
import { Observable, timeout } from 'rxjs';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


@Controller('api/gateway')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'admin-backend',
        // noAck: true,
        queueOptions: {
          durable: true
        },
      },
    })
  }

  @Post('criacategoria')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    // @Body() criarCategoriaDto: CriarCategoriaDto) {
    @Body() criarCategoriaDto: any) {
      console.log(criarCategoriaDto)
    return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }

  @Get('categoria/teste')
  consultarCategorias(@Payload() data: any):Observable<any> {
    let message = this.clientAdminBackend.send('consultar-categorias', data);

    // JSON.stringify(message)
    console.log(message)
    return message
  }
} 
