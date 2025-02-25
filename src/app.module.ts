import { Module } from '@nestjs/common';
import { ScooterController } from './interface/controllers/scooter.controller';
import { MaintenanceController } from './interface/controllers/maintenance.controller';
import { StockController } from './interface/controllers/stock.controller';
import { CreateScooterUseCase } from './application/use-cases/scooter/create-scooter.use-case';
import { ScheduleMaintenanceUseCase } from './application/use-cases/maintenance/schedule-maintenance.use-case';
import { UpdateStockUseCase } from './application/use-cases/stock/update-stock.use-case';
import { PrismaStockRepository } from './infrastructure/database/in-memory/stock.repository.impl';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaScooterRepository } from './infrastructure/database/prisma/prisma-scooter.repository';
import { PrismaMaintenanceRepository } from './infrastructure/database/prisma/prisma-maintenance.repository';
import { MaintenanceScheduler } from './domain/services/maintenance-scheduler';

@Module({
  imports: [],
  controllers: [ScooterController, MaintenanceController, StockController],
  providers: [
    PrismaService,
    CreateScooterUseCase,
    {
      provide: 'ScooterRepository',
      useClass: PrismaScooterRepository,
    },
    ScheduleMaintenanceUseCase,
    {
      provide: 'MaintenanceRepository',
      useClass: PrismaMaintenanceRepository,
    },
    UpdateStockUseCase,
    {
      provide: 'StockRepository',
      useClass: PrismaStockRepository,
    },
    MaintenanceScheduler,
  ],
  exports: [PrismaService],
})
export class AppModule {}
