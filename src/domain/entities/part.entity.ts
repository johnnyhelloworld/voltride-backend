export class Part {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public quantity: number,
    public minStock: number,
    public price: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
