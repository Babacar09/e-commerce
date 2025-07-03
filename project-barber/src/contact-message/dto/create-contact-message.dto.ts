import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateContactMessageDto {

@IsString()  
@IsNotEmpty()
name:string;

@IsEmail()
email:string;

@IsString()
@IsNotEmpty()
message:string


@IsOptional()
@IsIn(['pending', 'replied'])
status?: 'pending' | 'replied';

@IsOptional()
@IsString()
response?: string;

}
