import { Injectable, } from '@nestjs/common';
import { CreateCredentialsDtoForRegister } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsRepository {

    constructor(private readonly prisma: PrismaService) { }

    async createCredential(createCredentialDto: CreateCredentialsDtoForRegister) {
        return await this.prisma.credential.create({
            data: createCredentialDto
        });
    }

    async findAllCredential(userId: number) {
        return await this.prisma.credential.findMany({
            where: { userId }
        });
    }

    async findOneCredential(id: number) {
        return await this.prisma.credential.findUnique({
            where: { id }
        });
    }

    async getCredentialByTitle(title: string) {
        return await this.prisma.credential.findFirst({
            where: { title }
        })
    }

   /* async deleteCredentialByUserId(userId: number) {
        return await this.prisma.credential.delete({
            where: { userId }
        })
    }*/

    async deleteCredential(id: number) {
        return await this.prisma.credential.delete({
            where: { id }
        })
    }
}
