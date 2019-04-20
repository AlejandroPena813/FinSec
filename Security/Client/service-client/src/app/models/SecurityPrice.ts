export class SecurityPrice {
  Id: number;
  SecurityId: number;
  EndDayPrice: number;
  Date: Date;

  constructor(data: SecurityPrice) {
    this.Id = data.Id;
    this.SecurityId = data.SecurityId;
    this.EndDayPrice = data.EndDayPrice;
    this.Date = data.Date;
  }

}
