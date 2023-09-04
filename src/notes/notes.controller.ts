import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../guards/guards';
import { CreateNotesDto } from './dto/create-note.dto';
import { User } from '../decorators/user.decorator';


@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  async createNote(@Body() body: CreateNotesDto, @User() user) {
    try {
      return this.notesService.createNote(body, user)
    } catch (error) {
      if (error.message === 'CONFLICT') {
        throw new HttpException('CONFLICT', HttpStatus.FORBIDDEN)
      }
    }
  }

  @Get()
  async findAllNotes(@User() user) {
    return await this.notesService.findAllNotes(user)
  }

  @Get(':id')
  async findOneNote(@Param('id') id: string, @User() user) {
    try {
      return await this.notesService.findOneNote(Number(id), user)
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
      }
    }
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string, @User() user) {
    try {
      return await this.notesService.deleteNote(Number(id), user)
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
      }
    }
  }
}
