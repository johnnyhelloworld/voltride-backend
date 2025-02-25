export class Scooter {
  constructor(
    public id: string,
    public model: string,
    public mileage: number,
    public batteryCycles: number,
    public lastMaintenanceDate: Date,
    public status: 'active' | 'maintenance' | 'out_of_service',
  ) {}
}
