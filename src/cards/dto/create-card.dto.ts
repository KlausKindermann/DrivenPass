import { IsString,IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class CreateCardDto {

    @IsNotEmpty()
    @IsNumber()
    cardNumber: number

    @IsNotEmpty()
    @IsString()
    expireDate: Date

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isVirtual: boolean

    @IsNotEmpty()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsString()
    title: string

}

export class CreateCardDtoForRegister {

    @IsNotEmpty()
    @IsNumber()
    cardNumber: number

    @IsNotEmpty()
    @IsString()
    expireDate: Date

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isVirtual: boolean

    @IsNotEmpty()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsString()
    title: string


}