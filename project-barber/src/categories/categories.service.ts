import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity)private readonly categoryRepository:Repository<CategoryEntity>){}
  
  async create(createCategoryDto: CreateCategoryDto, currentUser:UserEntity):Promise<CategoryEntity> {
    
    const category =  this.categoryRepository.create({
      ...createCategoryDto,
      addedBy:currentUser
    }
    )
    category.addedBy = currentUser
  
    return await this.categoryRepository.save(category)
  }

  async findAll():Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id:number):Promise<CategoryEntity>{
    const category = await this.categoryRepository.findOne({
      where:{id},
      relations:{addedBy:true},
      select:{
        id:true,
        title:true,
        description:true,
        createdAt:true,
        updatedAt:true,
        addedBy:{
          id:true,
          name:true,
          email:true
        }
      }
    });
    if(!category) throw new NotFoundException('Category not found');
    return category;
  }

  // async findOne(id: number):Promise<CategoryEntity> {
  //   const category= await this.categoryRepository.findOne({
  //     where:{id:id},
  //     relations:{addedBy:true},
  //     select:{
  //       addedBy:{
  //         id:true,
  //         name:true,
  //         email:true

  //       }
  //     }
  //   },
    
  // )
  // if(!category) throw new NotFoundException("Category not found")
  //   return category
  // }

  async update(id: number, fields:Partial <UpdateCategoryDto>):Promise<CategoryEntity> {
    const category = await this.findOne(id)
    if(!category) throw new NotAcceptableException('Category not found')
      Object.assign(category, fields)

    return await this.categoryRepository.save(category);
  }

  async remove(id: number):Promise<{message:string}> {
    const result = await this.categoryRepository.delete(id)
    if(result.affected===0){
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return {message:`Category with ID ${id} removed successfully`};
  }

  async findAllWithProductCount() {
  const result = await this.categoryRepository
    .createQueryBuilder('category')
    .leftJoin('category.products', 'product')
    .loadRelationCountAndMap('category.productCount', 'category.products')
    .getMany();

  return result;
}

}
