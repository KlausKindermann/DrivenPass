import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/guards';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Cards')
@Controller('cards')

export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new card for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Card has been created" })
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
  @ApiOperation({ summary: 'It retrieves cards, as long as they belong to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Cards retrieved" })
  findAllCards(@User() user) {
    return this.cardsService.findAllCards(user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a specific card, as long as it belongs to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Card retrieved" })
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
  @ApiOperation({ summary: 'It retrieves a specific card, as long as it belongs to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Card retrieved" })
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
