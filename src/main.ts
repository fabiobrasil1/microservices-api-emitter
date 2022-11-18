import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone'
import { AllExeptionsFilter } from './filters/http-excepition.filter'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalFilters(new AllExeptionsFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this.date)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  await app.listen(3001);
}
bootstrap();
