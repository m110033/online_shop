import { Controller, Post, Body, Get } from '@nestjs/common';
import { LineBotService } from './line-bot.service';
import * as line from '@line/bot-sdk';

@Controller('callback')
export class LineBotController {
  constructor(private readonly lineBotService: LineBotService) {}

  @Get()
  getHello(): string {
    return 'Present line bot webhook';
  }

  @Post()
  async handleWebhook(@Body() body: any) {
    try {
      const events = body.events as line.WebhookEvent[];
      const results = await Promise.all(
        events.map((event: any) => this.lineBotService.handleEvent(event)),
      );
      return { success: true, results };
    } catch (err) {
      console.error('Error handling webhook:', err);
      return { success: false, message: 'Internal Server Error' };
    }
  }
}
