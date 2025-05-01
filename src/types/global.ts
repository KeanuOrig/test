export type DelayUnit = 'seconds' | 'minutes' | 'hours';

export type SendMessageParams = {
  message: string;
  webhookUrl: string;
  timeout?: number;
}
