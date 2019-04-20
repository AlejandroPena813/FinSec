import {SecurityPrice} from './SecurityPrice';

export class Security {
  Id: number;
  SecurityName: string; // 25 char
  ISIN: string; // 12 char alphanumeric
  Country: string; // 25 char
  DailyPrices?: SecurityPrice[];

  constructor(data: Security) {
    this.Id = data.Id;
    this.SecurityName = data.SecurityName;
    this.ISIN = data.ISIN;
    this.Country = data.Country;
    this.DailyPrices = []; // = data.DailyPrices;

    if (data.DailyPrices) {
      for (const price of data.DailyPrices) {
        this.DailyPrices.push(price);
      }
    }

  }
}
