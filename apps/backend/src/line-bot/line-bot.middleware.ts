import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as line from '@line/bot-sdk';
import { Middleware } from '@line/bot-sdk/dist/middleware';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineBotMiddleware implements NestMiddleware {
  private lineMiddleware: Middleware;

  constructor(private configService: ConfigService) {
    const secret = this.configService.get<string>('lineBot.secret') || '';
    const accessToken =
      this.configService.get<string>('lineBot.accessToken') || '';
    this.lineMiddleware = line.middleware({
      channelSecret: secret,
      channelAccessToken: accessToken,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    await this.lineMiddleware(req, res, next);
  }
}
