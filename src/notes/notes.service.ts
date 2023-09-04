import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { NotesRepository } from "./notes.repository"
import { CreateNotesDto } from "./dto/create-note.dto"
import { User } from "../decorators/user.decorator"


@Injectable()
export class NotesService {
  constructor(private notesRepository: NotesRepository) { }

  async createNote(note: CreateNotesDto, @User() user) {
    const exists = await this.notesRepository.findOneNoteByTitle(note.title)
    if (exists) {
      if (user.id !== exists.userId) {
        const body = { title: note.title, note: note.note, userId: user.id }
        return this.notesRepository.createNotes(body)
      } else {
        throw new ConflictException('CONFLICT')
      }
    } else {
      const body = { title: note.title, note: note.note, userId: user.id }
      return this.notesRepository.createNotes(body)
    }
  }

  async findAllNotes(@User() user) {
    return await this.notesRepository.findAllNotes(user.id)
  }

  async findOneNote(id: number, @User() user) {
    const exists = await this.notesRepository.findOneNote(id)
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

  async deleteNote(id: number, @User() user) {
    const exists = await this.notesRepository.findOneNote(id)
    if (exists) {
      if (exists.userId !== user.id) {
        throw new ForbiddenException('FORBIDDEN')
      } else {
        return await this.notesRepository.deleteNote(id)
      }
    } else {
      throw new NotFoundException('NOT FOUND')
    }
  }
}