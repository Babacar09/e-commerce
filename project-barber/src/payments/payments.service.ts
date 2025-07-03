// src/payment/payment.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
//import { Order } from './entities/order.entity';
import Stripe from 'stripe';
import { OrderEntity } from 'src/orders/entities/order.entity';

@Injectable()

 

export class PaymentsService {
  stripe: Stripe;

 

  constructor(


    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,

    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if(!stripeSecretKey){
    throw new Error("STRIPE_KEY is not in environnement variable")
  }
    this.stripe = new Stripe(stripeSecretKey,{
    apiVersion:"2025-04-30.basil"
  })
  }

  async createPayment(createPaymentDto: CreatePaymentDto, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    if (!order || order.orderProducts.length === 0) {
  throw new BadRequestException('La commande ne contient aucun produit.');
}

    //if (!order) throw new NotFoundException('Order not found');

    
    //const lineItems = order.orderProductsEntity.map((item) => ({
  
console.log('Order produits:', order.orderProducts);

    const lineItems= order.orderProducts.map((item)=>({
      price_data: {
        currency: 'eur',
        product_data: {
          images: [item.product.images[0]],
          name: item.product.title,
          description:item.product.description,
          
        },
        unit_amount: Math.round(item.product_unit_price * 100),
      },
      quantity: item.product_quantity,
    }));
    console.log('line items',lineItems);
    

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    const payment = this.paymentRepository.create({
      stripeSessionId: session.id,
      status: 'pending',
      order,
      user: { id: userId } as any,
    });

    await this.paymentRepository.save(payment);

    return { url: session.url };
  }
}

 
