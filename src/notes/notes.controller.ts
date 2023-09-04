import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '../guards/guards';
import { CreateNotesDto } from './dto/create-note.dto';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new note for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Safe Note has been created" })

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
  @ApiOperation({ summary: 'It retrieves all users notes ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Notes retrieved" })
  async findAllNotes(@User() user) {
    return await this.notesService.findAllNotes(user)
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a note, as long as it belongs to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Note retrieved" })
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
  @ApiOperation({ summary: 'It deletes note ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Note has been deleted from database" })
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
