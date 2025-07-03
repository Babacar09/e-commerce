import { Module } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { ContactMessageController } from './contact-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ContactMessageEntity } from './entities/contact-message.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ContactMessageEntity, UserEntity])
  ],
  controllers: [ContactMessageController],
  providers: [ContactMessageService],
  exports:[ContactMessageService]
})
export class ContactMessageModule {}
