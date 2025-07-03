import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PaymentEntity, OrderEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
