import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineBotService {
  private client: line.messagingApi.MessagingApiClient;

  constructor(private configService: ConfigService) {
    // Initialize the LINE messaging client
    const accessToken =
      this.configService.get<string>('lineBot.accessToken') || '';
    this.client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: accessToken,
    });
  }

  // Handle LINE events
  async handleEvent(event: line.WebhookEvent) {
    if (event.type === 'message') {
      // Handle message event
    } else if (event.type === 'join') {
      // Handle join event: while official account was added to a group.
    } else if (event.type === 'memberJoined') {
      // Handle memberJoined event
      return this.client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'textV2',
            text: (
              this.configService.get<string>('lineBot.message') || ''
            ).replaceAll('%N%', '\n'),
            substitution: {
              diam: {
                type: 'emoji',
                productId: '5ac21a13031a6752fb806d57',
                emojiId: '129',
              },
            },
          },
        ],
      });
    }
    return { success: true };
  }
}
