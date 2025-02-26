export class Reservation {
  constructor(
    public id: string,
    public scooterId: string,
    public userId: string,
    public startTime: Date,
    public endTime: Date,
    public location: string,
    public status: string = 'pending',
    public createdAt: Date = new Date(),
  ) {}
}
