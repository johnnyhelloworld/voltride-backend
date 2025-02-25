export class Stock {
  constructor(
    public id: string,
    public partName: string,
    public quantity: number,
    public threshold: number | null,
  ) {}
}
