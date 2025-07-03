import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';

import { CategoriesService } from 'src/categories/categories.service';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports:[
  TypeOrmModule.forFeature([ProductEntity]),
  CategoriesModule,
  forwardRef(()=>ReviewsModule),
  forwardRef(()=>OrdersModule),
  UsersModule

],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
 export class ProductsModule {}


