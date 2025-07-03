import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ContactMessageModule } from './contact-message/contact-message.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement accessibles globalement
    }),
    TypeOrmModule.forRoot(dataSourceOption),
     UsersModule,
     CategoriesModule,
     ProductsModule,
     ReviewsModule,
     OrdersModule,
     PaymentsModule,
     ContactMessageModule,
  
    ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
configure(consumer:MiddlewareConsumer){
    console.log('Middleware configuration starting...');
    consumer
    .apply(CurrentUserMiddleware)
    .forRoutes({path:'payments/create-session', method:RequestMethod.ALL})
    console.log('Middleware configured for all routes');
  }
}
