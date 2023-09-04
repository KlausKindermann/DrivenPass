import { Injectable, Scope } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import CreateUserDto from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {

  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  create(userDto: CreateUserDto) {
    return this.prisma.users.create({
      data: {
        ...userDto,
        password: bcrypt.hashSync(userDto.password, this.SALT)
      }
    })
  }

  getById(id: number) {
    return this.prisma.users.findUnique({
      where: { id }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.users.findFirst({
      where: { email }
    })
  }
}
