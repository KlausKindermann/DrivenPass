import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDtoForRegister } from "./dto/create-card.dto";


@Injectable()
export class CardsRepository {
    constructor(private prisma: PrismaService) { }

    async createCard(card: CreateCardDtoForRegister) {
        return await this.prisma.cards.create({
            data: card
        })
    }

    async findAllCards(userId: number) {
        return await this.prisma.cards.findMany({
            where: { userId }
        })
    }

    async findOneCard(id: number) {
        return await this.prisma.cards.findFirst({
            where: { id }
        })
    }

    async findOneCardByTitle(title: string) {
        return await this.prisma.cards.findFirst({
            where: { title }
        })
    }

    async deleteCard(id: number) {
        return await this.prisma.cards.delete({
            where: { id }
        })
    }

    async deleteCardByUserId(userId: number) {
        return await this.prisma.cards.delete({
            where: { userId }
        })
    }
}