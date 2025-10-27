import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { CompaniesModule } from './companies/companies.module';
import { DealsModule } from './deals/deals.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, AuthModule, CustomersModule, CompaniesModule, DealsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
