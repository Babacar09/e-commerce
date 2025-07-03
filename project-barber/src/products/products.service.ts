import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderStatus } from 'src/orders/enums/order-status.enum';
import dataSource from 'db/data-source';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ReviewsService } from 'src/reviews/reviews.service';
import { promises } from 'dns';
import { ProductsDto } from './dto/product.dto';
import { plainToInstance } from 'class-transformer';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { OrdersService } from 'src/orders/orders.service';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) 
  private readonly productRepository:Repository<ProductEntity>,
  private readonly categoryService:CategoriesService,
  @Inject(forwardRef(()=>ReviewsService))
  private readonly reviewService:ReviewsService,
  private readonly dataSource:DataSource,
  //private readonly orderService:OrdersService,
  @Inject(forwardRef(() => OrdersService))
  private readonly orderService: OrdersService,
){}


async create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
 
 const images = createProductDto.images ? createProductDto.images.filter(image=>image?.trim() !==""):[]
  if (createProductDto.images && createProductDto.images.length > 0) {
    createProductDto.images = createProductDto.images.filter(image => image && image.trim() !== "");
  } else {
    createProductDto.images = [];
  }
  console.log('Images avant sauvegarde :', createProductDto.images);

  const category = await this.categoryService.findOne(+createProductDto.categoryId);

  if (!category) {
    throw new NotFoundException("Category not found");
  }

  
  const product = this.productRepository.create({
    ...createProductDto,
    
    images:images,
    category,
    addedBy: currentUser,
  });

  //@ts-ignore
  product.category = category;
  product.addedBy = currentUser;
  console.log('Produit avant sauvegarde:', product.images);

console.log('Produit avant save:', product);

const savedProduct = await this.productRepository.save(product);

// Maintenant savedProduct.id est garanti
//@ts-ignore
return {
  id: savedProduct.id,
  title: savedProduct.title,
  description: savedProduct.description,
  price: savedProduct.price,
  images: savedProduct.images,
  category: savedProduct.category,
};
  };
  



  // Mise à jour d'un produit
  async updateCategory(categoryId: number, updateCategoryDto: { title: string }): Promise<CategoryEntity> {
    const category = await this.categoryService.findOne(categoryId);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Mise à jour du titre de la catégorie
    category.title = updateCategoryDto.title;

    // Sauvegarder la catégorie mise à jour et la retourner
    return await this.categoryService.update(categoryId, { title: category.title });
  
  }



private applyFilters(queryBuilder, query) {
  if (query.search) {
    const search = query.search;
    console.log('=== Applying Filters ===', query);
    queryBuilder.andWhere("product.title like :title", {
      title: `%${search}%`,
    });
    console.log(search);
  }

  if (query.category) {
    // queryBuilder.andWhere("category.id = :id", {
    //   id: query.category,
    // });
    queryBuilder.andWhere('LOWER(category.title)=LOWER(:title)',{
      title:query.category,
    })
    console.log(query.category);
  }

  if (query.minPrice) {
    queryBuilder.andWhere("product.price >= :minPrice", {
      minPrice: query.minPrice,
    });
    console.log(query.minPrice);
  }

  if (query.maxPrice) {
    queryBuilder.andWhere("product.price <= :maxPrice", {
      maxPrice: query.maxPrice,
    });
    console.log(query.maxPrice);
  }

  if (query.minRating) {
    queryBuilder.andHaving("AVG(review.ratings) >= :minRating", { minRating: query.minRating });
  }

  if (query.maxRating) {
    queryBuilder.andHaving("AVG(review.ratings) <= :maxRating", { maxRating: query.maxRating });
  }

  return queryBuilder;
}

async findAll(query: any) {
  const limit = +query.limit || 50;
  const page = +query.page || 1;
  const offset = (page - 1) * limit;

  const queryBuilder = dataSource
    .getRepository(ProductEntity)
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.category', 'category')
    .leftJoin('product.reviews', 'review')
    .addSelect([
      'COUNT(review.id) AS reviewCount',
      'COALESCE(AVG(review.ratings)::numeric(10,2), 0) AS avgRating',
    ])
    .groupBy('product.id, category.id');



  this.applyFilters(queryBuilder, query);

  queryBuilder.limit(limit).offset(offset);

  // const totalProductsCount = await queryBuilder.getCount();
  // const products = await queryBuilder.getRawMany();



      if (query.category) {
    queryBuilder.where('category.title = :categoryTitle', {
      categoryTitle: query.category,
    });
  }

   const [products, totalProductsCount] = await Promise.all([
    queryBuilder.getRawMany(),
    queryBuilder.getCount(),
  ]);
  return {
    products,
    totalProductsCount,
    totalPages: Math.ceil(totalProductsCount / limit),
    limit,
    currentPage:page
  };
}




  
  async findOne(id: number){
    console.log('Recherche du produit avec l\'ID:', id); 
    const product = await this.productRepository.findOne({
      where:{id},
      relations:{
        addedBy:true,
        category:true,
        
      },
      select:{
        addedBy:{
          id:true,
          name:true,
          email:true
        },
        category:{
          id:true,
          title:true
        }
      }
    })
    if(!product) throw new NotFoundException('Product not found')
      return product
  }

  async findByCategoryTitle(title: string) {
  return this.productRepository.find({
    where: {
      category: {
        title: title,
      },
    },
    relations: {
      addedBy: true,
      category: true,
    },
    select: {
      addedBy: {
        id: true,
        name: true,
        email: true,
      },
      category: {
        id: true,
        title: true,
      },
    },
  });
}


  async update(
    id: number,
    updateProductDto:Partial<UpdateProductDto>,
    currentUser:UserEntity,
  ):Promise<ProductEntity> {
   const product = await this.findOne(id)
   Object.assign(product, updateProductDto)
    product.addedBy= currentUser
    if(updateProductDto.categoryId){
      const category = await this.categoryService.findOne(+updateProductDto.categoryId)
      
      product.category = category
    }
    return await this.productRepository.save(product)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }

  async remove(id: number) {
    const product = await this.findOne(id);
    console.log(product);
    const order = await this.orderService.findOneByProductId(product.id);
    if (order) throw new BadRequestException('Products is in use.');

    return await this.productRepository.remove(product);
  }

  async updateStock(id: number, stock: number, status: string) {
    let product = await this.findOne(id);
    if (status === OrderStatus.DELIVERED) {
      product.stock -= stock;
    } else {
      product.stock += stock;
    }
    product = await this.productRepository.save(product);
    return product;
  }
  }