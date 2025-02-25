export class Incident {
  constructor(
    public id: string,
    public scooterId: string,
    public description: string,
    public reportedAt: Date,
    public resolvedAt: Date,
    public status: 'pending' | 'in progress' | 'resolved',
    public underWarranty: boolean,
    public immobilizationDuration?: number,
    public warrantyExpiresAt?: Date,
    public immobilizedDays?: number,
  ) {}
}
