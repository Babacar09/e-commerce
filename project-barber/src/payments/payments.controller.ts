import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-roles.enum';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post('create-session')
 async createPayment(@Body() createPaymentDto: CreatePaymentDto,  @Request() req) {
  console.log('createPaymentDto:', createPaymentDto);
  console.log('Requete user',req.currentUser);
  console.log('Requete user.id',req.currentUser.id);
   console.log('User:', req.currentUser); 
   console.log('Role de user',req.currentUser.roles);
   
  
  
    return this.paymentsService.createPayment(createPaymentDto, req.currentUser.id);
  }

  // @Get()
  // findAll() {
  //   return this.paymentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentsService.remove(+id);
  // }
}
