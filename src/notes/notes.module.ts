import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [PrismaModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, PrismaService],
  exports: [NotesService]
})
export class NotesModule { }
