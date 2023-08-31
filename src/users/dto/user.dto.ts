import { IsEmail, IsNotEmpty, IsStrongPassword} from 'class-validator';

export default class CreateUserDto {
    @IsNotEmpty({ message: 'All fields are required!' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'All fields are required!' })
    @IsStrongPassword()
    password: string
}

