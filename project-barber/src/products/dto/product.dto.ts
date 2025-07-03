import { Expose, Transform, Type } from 'class-transformer';

export class ProductsDto {
  @Expose()
  totalProducts: number;
  @Expose()
  limit: number;
  @Expose()
  @Type(() => ProductList)
  products: ProductList[];
}

export class ProductList {
  @Expose({ name: 'product_id' })
  id: number;
  @Expose({ name: 'product_title' })
  title: string;

  @Expose({ name: 'product_description' })
  description: string;
  @Expose({ name: 'product_price' })
  price: number;
  @Expose({ name: 'product_stock' })
  stock: number;
  @Expose({ name: 'product_images' })
  @Transform(({ value }) => value.toString().split(','))
  images: string[];

  @Transform(({ obj }) => {
    return {
      id: obj.category_id,
      title: obj.category_title,
    };
  })
  @Expose()
  category: any;

  @Expose({ name: 'reviewcount' })
  review: number;
  @Expose({ name: 'avgrating' })
  rating: number;
}



















// import { Expose, Transform, Type } from 'class-transformer';

// export class UserDto {
//   @Expose()
//   id: number;

//   @Expose()
//   name: string;

//   @Expose()
//   email: string;
// }

// export class CategoryDto {
//   @Expose()
//   id: number;

//   @Expose()
//   title: string;
// }

// export class ProductList {
//   @Expose()
//   id: number;
  
//   @Expose()
//   title: string;

//   @Expose()
//   description: string;
  
//   @Expose()
//   @Transform(({ value }) => parseFloat(value))
//   price: number;
  
//   @Expose()
//   stock: number;
  
//   @Expose()
//   @Transform(({ value }) =>
//     typeof value === 'string'
//       ? value.split(',')
//       : Array.isArray(value)
//       ? value
//       : []
//   )
//   images: string[];

//   @Expose()
//   @Type(() => CategoryDto)
//   category: CategoryDto;

//   @Expose()
//   @Type(() => UserDto)
//   addedBy: UserDto;

//   @Expose()
//   reviewCount: number;

//   @Expose()
//   averageRating: number;

//   @Expose()
//   createdAt: Date;

//   @Expose()
//   updatedAt: Date;

//   @Expose()
//   categoryId: number;
// }

// export class ProductsDto {
//   @Expose()
//   total: number;
  
//   @Expose()
//   limit: number;
  
//   @Expose()
//   offset: number;
  
//   @Expose()
//   @Type(() => ProductList)
//   products: ProductList[];
// }