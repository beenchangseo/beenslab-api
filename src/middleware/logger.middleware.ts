import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    constructor() {}

    use(request: Request, response: Response, next: NextFunction) {
        const { method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        const forwarded = request.headers['x-forwarded-for'];
        const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : request.ip;

        response.on('finish', () => {
            const { statusCode } = response;
            this.logger.log(`${method} ${statusCode} - ${originalUrl} - ${ip} - ${userAgent}`);
        });

        next();
    }
}
