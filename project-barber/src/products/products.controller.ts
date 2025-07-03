import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { SerializeIncludes, SerializeInterceptor } from 'src/utility/interceptors/serialize.interceptor';
import { ProductsDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  @UseInterceptors(FileInterceptor('image', {

    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        if (!file) {
          return callback(new Error("Aucun fichier recu"), '')
        }
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname))
      }
    })
  }))



  async create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() currentUser: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProductEntity> {
    if (file) {
      createProductDto.images = [`/uploads/${file.filename}`]
    } else if (!createProductDto.images) {
      //console.log('Aucun fichier recu');
      createProductDto.images = []

    }
    console.log("Images envoyees", createProductDto.images);
    return await this.productsService.create(createProductDto, currentUser);
  }

  //@UseInterceptors(SerializeInterceptor)
  @SerializeIncludes(ProductsDto)
  @Get()
  async findAll(@Query() query: any): Promise<ProductsDto> {
    //@ts-ignore
    return await this.productsService.findAll(query)
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   console.log('ID reçu dans le backend:', id);
  //   return await this.productsService.findOne(id);
  // }


  @Get()
async getProducts(@Query() query: any) {
  return this.productsService.findAll(query);
}


  @Get()
  async findByCategory(@Query('category') category: string) {
    if (!category) {
      throw new NotFoundException('Catégorie non spécifiée');
    }
    const products = await this.productsService.findByCategoryTitle(category);
    if (!products || products.length === 0) {
    throw new NotFoundException(`Aucun produit trouvé pour la catégorie : ${category}`);
  }
    return products;
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    //console.log('ID reçu dans le backend (après ParseIntPipe):', id); // Ex: 1
    return await this.productsService.findOne(+id);
  }




  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto, @CurrentUser() currentUser: UserEntity,): Promise<ProductEntity> {
    return await this.productsService.update(+id, updateProductDto, currentUser);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }
}


