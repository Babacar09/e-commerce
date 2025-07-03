import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}
  
  @Post("signup")
  async signup(@Body() userSignUp:UserSignUpDto):Promise<{user:UserEntity}>{
    console.log(userSignUp)
    return {user:await this.usersService.signup(userSignUp)}
    
}
  @Post("signin")
  async signin(@Body() userSignInDto:UserSignInDto){
  const user =   await this.usersService.signin(userSignInDto)
  if (!user) {
    throw new Error('User not found');
  }
  const accessToken = await this.usersService.accessToken(user)
  return{accessToken, user}
}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //return this.usersService.create(createUserDto);
    return 'bonjour'
  }

  @AuthorRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get("all")
  async findAll():Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string):Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

 @UseGuards(AuthenticationGuard)
 @Get("me")
 getProfile(@CurrentUser() currentUser:UserEntity ){
    return currentUser
 }

 
}
