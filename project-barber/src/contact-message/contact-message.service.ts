import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {ContactMessageEntity } from './entities/contact-message.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ContactMessageService {
  constructor(
    @InjectRepository(ContactMessageEntity)
    private contactRepo:Repository<ContactMessageEntity>,
  ){}
  async create(createContactMessageDto: CreateContactMessageDto, user?:UserEntity) {
    const contact = this.contactRepo.create({
      ...createContactMessageDto,
      user
    })
    return this.contactRepo.save(contact)
  }

  findAll() {
      return this.contactRepo.find({
        relations:['user'],
        order:{createdAt:'DESC'}
      })

  }
  findByUser(userId:number){
    return this.contactRepo.find({
      where:{user:{id:userId}},
      order:{createdAt:'DESC'},
      relations:['user']
    })
  }
  async respondToMessage(id: number, response: string) {
  const message = await this.contactRepo.findOneBy({ id });
  if (!message) {
    throw new NotFoundException('Message non trouvé');
  }

  message.status = 'replied';
  message.response = response;

  return this.contactRepo.save(message);
}


  findOne(id: number) {
    return `This action returns a #${id} contactMessage`;
  }

  async update(id: number, updateContactMessageDto: UpdateContactMessageDto) {
    const message = await this.contactRepo.findOneBy({id});
    if(!message){
      throw new NotFoundException(`Message de l'id ${id} non trouvé`);
    }
    Object.assign(message, updateContactMessageDto)
    return this.contactRepo.save(message)
    //return `This action updates a #${id} contactMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactMessage`;
  }
}
