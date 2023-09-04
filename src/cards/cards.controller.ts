import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/guards';
import { User } from '../decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  createCard(@Body() body: CreateCardDto, @User() user) {
    try {
      return this.cardsService.createCard(body, user);
    } catch (error) {
      if (error.message === 'CONFLICT') {
        throw new HttpException('Cannot create card', HttpStatus.CONFLICT)
      }
    }

  }

  @Get()
  findAllCards(@User() user) {
    return this.cardsService.findAllCards(user)
  }

  @Get(':id')
  findOneCard(@Param('id') id: string, @User() user) {
    try {
      return this.cardsService.findOneCard(Number(id), user);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('Card has not been found', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('This card does not belong to you', HttpStatus.FORBIDDEN)
      }
    }
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string, @User() user) {
    try {
      return this.cardsService.deleteCard(Number(id), user);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('Card has not been found', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('This card does not belong to you', HttpStatus.FORBIDDEN)
      }
    }
  }
}
