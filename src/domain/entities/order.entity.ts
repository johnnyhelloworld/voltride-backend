export class Order {
  constructor(
    public id: string,
    public partId: string,
    public supplier: string,
    public quantity: number,
    public unitPrice: number,
    public orderDate: Date,
    public deliveryDate: Date | null,
    public totalPrice: number,
    public status: string,
  ) {
    this.totalPrice = this.quantity * this.unitPrice;
  }
}
