import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
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
        urls: ['amqp://<usuarioRabitMQ>:<passwordRabitMQ>18.210.17.173:5672/srmartranking'],
        queue: 'admin-backend'
      },
    })
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto){
      return await this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto)
  }
}
