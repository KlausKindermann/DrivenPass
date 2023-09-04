import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CardsModule } from "./cards/cards.module";
import { NotesModule } from "./notes/notes.module";
import { UsersModule } from "./users/users.module";
import { CredentialsModule } from "./credentials/credentials.module";
import { EraseModule } from "./erase/erase.module";


@Module({
  imports: [PrismaModule, CardsModule, NotesModule, UsersModule, CredentialsModule, EraseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
