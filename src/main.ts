import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.set('trust proxy', true);

    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors({
        origin: configService.get<string>('FRONTEND_SERVER_DOMAIN'), // Next.js 애플리케이션의 도메인
        credentials: true,
        exposedHeaders: ['x-session-expired'], // 노출할 헤더를 지정
    });

    await app.listen(4000);
}
bootstrap();
