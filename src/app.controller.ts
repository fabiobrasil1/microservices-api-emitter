import { Body, Controller, Get, Logger, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Observable } from 'rxjs';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';


@Controller('api/gateway')
export class AppController {

  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        // urls: ['amqp://<usuarioRabitMQ>:<passwordRabitMQ>@<ip_InstanciaRBTMQ_AWS>:<portaConexaoAplicaco>/<virtualhostname>']
        urls: ['amqp://admin:admin@18.210.17.173:5672/srmartranking'],
        queue: 'admin-backend'
      },
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }

  @Get('categoria/:id')
  consultarCategorias(@Query('idCategoria') _id: string): Observable<any>{

    return this.clientAdminBackend.send('consultar-categorias', _id ? _id: '')
  }
} 
