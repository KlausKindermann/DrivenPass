import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInDto {
    @IsNotEmpty({ message: 'All fields are required!' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'All fields are required!' })
    password: string
}