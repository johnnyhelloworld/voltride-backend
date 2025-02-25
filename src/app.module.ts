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
import { MaintenanceScheduler } from './application/services/maintenance-scheduler';
import { ScheduleModule } from '@nestjs/schedule';
import { NotifyUpcomingMaintenanceUseCase } from './application/use-cases/maintenance/notify-upcoming-maintenance.use-case';
import { NotificationService } from './application/services/notification.service';
import { MaintenanceCronService } from './application/services/maintenance-cron.service';
import { RolesGuard } from './application/guards/roles.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interface/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { PrismaUserRepository } from './infrastructure/database/prisma/prisma-user.repository';
import { ConfigModule } from '@nestjs/config';
import { IncidentController } from './interface/controllers/incident.controller';
import { ReportIncidentUseCase } from './application/use-cases/incident/report-incident.use-case';
import { PrismaIncidentRepository } from './infrastructure/database/prisma/prisma-incident.repository';
import { ManageWarrantyUseCase } from './application/use-cases/incident/manage-warranty.use-case';
import { PrismaPartRepository } from './infrastructure/database/prisma/prisma-part.repository';
import { PartController } from './interface/controllers/part.controller';
import { PartService } from './application/services/part.service';
import { OrderController } from './interface/controllers/order.controller';
import { PrismaOrderRepository } from './infrastructure/database/prisma/prisma-order.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    ScooterController,
    MaintenanceController,
    StockController,
    AuthController,
    IncidentController,
    PartController,
    OrderController,
  ],
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
    NotifyUpcomingMaintenanceUseCase,
    NotificationService,
    MaintenanceCronService,
    RolesGuard,
    AuthService,
    JwtStrategy,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    ReportIncidentUseCase,
    {
      provide: 'IncidentRepository',
      useClass: PrismaIncidentRepository,
    },
    ManageWarrantyUseCase,
    {
      provide: 'PartRepository',
      useClass: PrismaPartRepository,
    },
    PartService,
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
