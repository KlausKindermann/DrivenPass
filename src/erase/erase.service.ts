import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateEraseDto } from "./dto/create-erase.dto";
import { User } from "../decorators/user.decorator";
import { EraseRepository } from "./erase.repository";
import { UsersRepository } from "../users/users.repository";
import bcrypt from 'bcrypt'

@Injectable()
export class EraseService {
    constructor (private repository: EraseRepository, private userRepository: UsersRepository) {}

    async erase(password: CreateEraseDto, @User() user) {
        const usuario = await this.userRepository.getById(user.id)
        const valid = await bcrypt.compare(password, usuario.password);
        if (!valid) {
            throw new UnauthorizedException(`Wrong password, please insert the right one`);
        } else {
            await this.repository.deleteCardByUserId(user.id)
            await this.repository.deleteCredentialByUserId(user.id)
            await this.repository.deleteNoteByUserId(user.id)
            return await this.repository.deleteUser(user.id)
        }
    }
}