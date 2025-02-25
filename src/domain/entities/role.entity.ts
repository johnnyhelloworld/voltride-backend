export class Role {
  constructor(
    public id: string,
    public name: 'ADMIN' | 'FLEET_MANAGER' | 'PARTNER' | 'RESELLER' | 'CLIENT',
  ) {}
}
