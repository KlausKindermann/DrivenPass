import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule], 
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository, PrismaService],
  exports: [CredentialsService]
})
export class CredentialsModule {}
