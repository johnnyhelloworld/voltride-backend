export class IncidentReport {
  constructor(
    public id: string,
    public scooterId: string,
    public userId: string,
    public description: string,
    public reportedAt: Date = new Date(),
    public status: string = 'pending',
    public severity: string,
    public location: string,
    public createdAt: Date = new Date(),
  ) {}
}
