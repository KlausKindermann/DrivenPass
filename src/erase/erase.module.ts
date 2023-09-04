import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { EraseRepository } from './erase.repository';

@Module({
  imports: [PrismaModule], 
    controllers: [EraseController],
    providers: [EraseService, EraseRepository, PrismaService],
    exports: [EraseService]
  })
export class EraseModule {}
