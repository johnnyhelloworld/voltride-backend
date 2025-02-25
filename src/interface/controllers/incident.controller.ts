import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ReportIncidentUseCase } from '../../application/use-cases/incident/report-incident.use-case';
import { ManageWarrantyUseCase } from 'src/application/use-cases/incident/manage-warranty.use-case';

@Controller('incidents')
export class IncidentController {
  constructor(
    private readonly reportIncidentUseCase: ReportIncidentUseCase,
    private manageWarrantyUseCase: ManageWarrantyUseCase,
  ) {}

  @Post('report')
  async reportIncident(
    @Body()
    body: {
      scooterId: string;
      description: string;
      underWarranty: boolean;
    },
  ): Promise<void> {
    await this.reportIncidentUseCase.execute(body);
  }

  @Patch(':incidentId/update-status')
  async updateIncidentStatus(
    @Param('incidentId') incidentId: string,
    @Body()
    body: {
      resolvedAt?: string;
      status: 'in progress' | 'resolved';
      warrantyExpiresAt?: string;
    },
  ): Promise<void> {
    console.log('Updating incident with ID:', incidentId);
    console.log('Update body:', body);
    await this.manageWarrantyUseCase.execute({
      incidentId,
      resolvedAt: body.resolvedAt ? new Date(body.resolvedAt) : undefined,
      status: body.status,
      warrantyExpiresAt: body.warrantyExpiresAt
        ? new Date(body.warrantyExpiresAt)
        : undefined,
    });
  }
}
