import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { UserRepository } from "./users.repository";


@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule],
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})

export class UsersModule { }