export type LinePayResponse = {
  returnCode: string;
  returnMessage: string;
  info: {
    paymentUrl: {
      web: string;
      app: string;
    };
    transactionId: number;
    paymentAccessToken: string;
  };
};
