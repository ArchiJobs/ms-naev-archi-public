import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { CategoriesModule } from './categories/categories.module';
import { LocationsModule } from './locations/locations.module';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './config/database.module';

@Module({
  imports: [DatabaseModule, JobsModule, CategoriesModule, LocationsModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
