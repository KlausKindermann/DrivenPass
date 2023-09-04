import { IsString, IsStrongPassword, IsNotEmpty, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}

export class userDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    @IsNumber()
    id: number
}