import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseRepository } from 'src/database/src/repositories/houses';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HouseRepository
    ])
  ],
  controllers: [HousesController],
  providers: [HousesService],
  exports: [HousesService]
})
export class HousesModule {}
