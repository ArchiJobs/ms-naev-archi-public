import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Servidor HTTP
  const httpPort = configService.get<number>('HTTP_PORT', 3000);
  await app.listen(httpPort);
  console.log(`[HTTP] Servidor levantado en: http://localhost:${httpPort}`);

  // Servidor gRPC
  const grpcUrl = configService.get<string>('GRPC_URL', 'localhost:9091');
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'jobs',
      protoPath: join(__dirname, 'proto', 'jobs.proto'),
      url: grpcUrl,
    },
  });
  await app.startAllMicroservices();
  console.log(`[gRPC] Microservicio levantado en: ${grpcUrl}`);
}

bootstrap();