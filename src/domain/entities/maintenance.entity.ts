export class Maintenance {
  constructor(
    public id: string,
    public scooterId: string,
    public type: 'preventive' | 'corrective',
    public date: Date,
    public cost: number,
    public partsReplaced: string[],
    public notes: string,
  ) {}
}
