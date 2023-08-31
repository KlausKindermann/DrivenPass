import { IsEmail, IsNotEmpty, IsStrongPassword, } from 'class-validator';

export default class CreateUserDto {
    @IsNotEmpty({ message: 'All fields are required!' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'All fields are required!' })
    @IsStrongPassword({
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
        minLength: 4,
    })
    password: string
}

