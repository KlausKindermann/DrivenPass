import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule], 
  controllers: [CredentialsController, UsersService],
  providers: [CredentialsService, CredentialsRepository, PrismaService, UsersService],
  exports: [CredentialsService]
})
export class CredentialsModule {}
