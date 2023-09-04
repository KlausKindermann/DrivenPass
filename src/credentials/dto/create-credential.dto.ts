import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export default class CreateCredentialDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class CreateCredentialsDtoForRegister {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNumber()
  @IsNotEmpty()
  userId: number
}
