import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from '../decorators/user.decorator';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private repository: CardsRepository) { }

  async createCard(card: CreateCardDto, @User() user) {
    const exists = await this.repository.findOneCardByTitle(card.title)
    if (exists) {
      if (user.id !== exists.userId) {
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        const encryptedString = cryptr.encrypt(card.password);
        const body = {
          title: card.title, cardNumber: card.cardNumber, userId: user.id,
          password: encryptedString, isVirtual: card.isVirtual, expireDate: card.expireDate,
          type: card.type
        }
        return this.repository.createCard(body)
      } else {
        throw new ConflictException('CONFLICT')
      }
    } else {
      const Cryptr = require('cryptr');
      const cryptr = new Cryptr(process.env.JWT_SECRET);
      const encryptedString = cryptr.encrypt(card.password);
      const body = {
        title: card.title, cardNumber: card.cardNumber, userId: user.id,
        password: encryptedString, isVirtual: card.isVirtual, expireDate: card.expireDate,
        type: card.type
      }
      return this.repository.createCard(body)
    }
  }


  async findAllCards(@User() user) {
    return await this.repository.findAllCards(user.id)
  }

  async findOneCard(id: number, @User() user) {
    const exists = await this.repository.findOneCard(id)
    if (exists) {
      if (exists.userId !== user.id) {
        throw new ForbiddenException('FORBIDDEN')
      } else {
        return exists;
      }
    } else {
      throw new NotFoundException('NOT FOUND')
    }
  }

  async deleteCard(id: number, @User() user) {
    const exists = await this.repository.findOneCard(id)
    if (exists) {
      if (exists.userId !== user.id) {
        throw new ForbiddenException('FORBIDDEN')
      } else {
        return await this.repository.deleteCard(id)
      }
    } else {
      throw new NotFoundException('NOT FOUND')
    }
  }
}
