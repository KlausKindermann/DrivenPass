import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";


@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), PrismaModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {

}