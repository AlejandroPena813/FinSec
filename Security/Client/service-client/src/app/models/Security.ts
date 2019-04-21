import {SecurityPrice} from './SecurityPrice';

export class Security {
  id: number;
  securityName: string; // 25 char
  isin: string; // 12 char alphanumeric
  country: string; // 25 char
  dailyPrices?: SecurityPrice[];

  constructor(data: Security) {
    this.id = data.id;
    this.securityName = data.securityName;
    this.isin = data.isin;
    this.country = data.country;
    this.dailyPrices = []; // = data.dailyPrices;

    if (data.dailyPrices) {
      for (const price of data.dailyPrices) {
        console.log('price ' + price.endDayPrice);
        this.dailyPrices.push(price);
      }
    }

  }
}
