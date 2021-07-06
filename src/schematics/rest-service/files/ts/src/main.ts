import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { JwtAuthGuard } from 'modules/auth/jwt-auth.guard';
import { EnvironmentService } from 'modules/environment/environment.service';
import { AppModule } from 'app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix(new EnvironmentService().getEnvs().GLOBAL_ROUTES_PREFIX);

  const options = new DocumentBuilder()
    .setTitle('New REST API')
    .setDescription('NestJS API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 3034);
}
bootstrap();
