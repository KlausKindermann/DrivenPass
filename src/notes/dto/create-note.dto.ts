import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotesDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    note: string
}

export class CreateNotesDtoForRegister {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    note: string

    @IsNumber()
    @IsNotEmpty()
    userId: number
}