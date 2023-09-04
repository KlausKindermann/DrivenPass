import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/user.dto";


@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async createUser(user: CreateUserDto) {
    return await this.prisma.users.create({ data: user })
  }

  async getUserByEmail(email: string) {
    return await this.prisma.users.findFirst({ where: { email } })
  }

  async getUserById(id: number) {
    return await this.prisma.users.findUnique({ where: { id } })
  }
}