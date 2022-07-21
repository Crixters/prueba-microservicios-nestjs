import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountRepository } from 'src/database/src/repositories/discounts';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiscountRepository
    ])
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService]
})
export class DiscountsModule {}
