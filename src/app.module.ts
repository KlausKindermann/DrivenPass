import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { EraseModule } from './erase/erase.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
  imports: [UsersModule, CredentialsModule, NotesModule, CardsModule, EraseModule, AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
