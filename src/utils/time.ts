import { DelayUnit } from '@tstypes/index';

export const getDelayInMs = (amount: number, unit: DelayUnit): number => {
  switch (unit) {
    case 'minutes':
      return amount * 60 * 1000;
    case 'hours':
      return amount * 60 * 60 * 1000;
    default:
      return amount * 1000;
  }
};
