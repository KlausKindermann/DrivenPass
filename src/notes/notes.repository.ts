import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNotesDtoForRegister } from "./dto/create-note.dto";

@Injectable()
export class NotesRepository {
    constructor(private prisma: PrismaService) { }

    async createNotes(createNotesDto: CreateNotesDtoForRegister) {
        return await this.prisma.safeNotes.create({
            data: createNotesDto
        })
    }

    async findAllNotes(userId: number) {
        return await this.prisma.safeNotes.findMany({
            where: { userId }
        })
    }

    async findOneNote(id: number) {
        return await this.prisma.safeNotes.findFirst({
            where: { id }
        })
    }

    async findOneNoteByTitle(title: string) {
        return await this.prisma.safeNotes.findFirst({
            where: { title }
        })
    }

    async deleteNote(id: number) {
        return await this.prisma.safeNotes.delete({
            where: { id }
        })
    }

    /* async deleteNoteByUserId(userId: number) {
         return await this.prisma.notes.delete({
             where: { userId }
         })
     }*/
}