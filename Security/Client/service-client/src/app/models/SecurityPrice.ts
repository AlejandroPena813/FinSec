export class SecurityPrice {
  id: number;
  securityId: number;
  endDayPrice: number;
  date: Date;

  constructor(data: SecurityPrice) {
    this.id = data.id;
    this.securityId = data.securityId;
    this.endDayPrice = data.endDayPrice;
    this.date = data.date;
  }

}
