export default () => {
  if (
    !process.env.LINE_CHANNEL_SECRET ||
    !process.env.LINE_CHANNEL_ACCESS_TOKEN
  ) {
    throw new Error('LINE bot credentials are missing!');
  }

  return {
    port: parseInt(process.env.PORT || '3000', 10) || 3000,
    hostUrl: process.env.HOST_URL || '',
    lineBot: {
      secret: process.env.LINE_CHANNEL_SECRET || '',
      accessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
      message: process.env.LINE_BOT_MESSAGE || '',
    },
    linePay: {
      channelId: process.env.LINE_PAY_CHANNEL_ID || '',
      channelSecret: process.env.LINE_PAY_CHANNEL_SECRET || '',
      url: process.env.LINE_PAY_URL || '',
    },
  };
};
