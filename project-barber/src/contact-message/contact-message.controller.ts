import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';

@Controller('contact-message')
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createContactMessageDto: CreateContactMessageDto,
    @Request() req
  ) {
    const user = req.currentUser
    return this.contactMessageService.create(createContactMessageDto, user);
  }

  @Post()
  async sendMessage(
    @Body() dto:CreateContactMessageDto,
    @Req()  req:Request
  ){
    //@ts-ignore
    const user = req.currentUser || null;
    return this.contactMessageService.create(dto, user)
  }

  @UseGuards(AuthenticationGuard)
  @Get()
  async getAllMessages() {
    return this.contactMessageService.findAll();
  }

  @Get('my-message')
  @UseGuards(AuthenticationGuard)
async getMyMessage(@Request() req){
  const userId = req.currentUser.id;
  return this.contactMessageService.findByUser(userId)
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactMessageDto: UpdateContactMessageDto) {
    return this.contactMessageService.update(+id, updateContactMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactMessageService.remove(+id);
  }
}
