import { Body, Controller, Delete, HttpException, HttpStatus, UseGuards } from "@nestjs/common"
import { AuthGuard } from "../guards/guards"
import { EraseService } from "./erase.service"
import { CreateEraseDto } from "./dto/create-erase.dto"
import { User } from "../decorators/user.decorator"


@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private eraseService: EraseService) { }

 /* @Delete()
  async erase(@Body() body: CreateEraseDto, @User() user) {
    try {
      return await this.eraseService.erase(body, user)
    } catch (error) {
      if (error.message === 'UNAUTHORIZED') {
        throw new HttpException('Wrong password, try again!', HttpStatus.UNAUTHORIZED)
      }
    }
  }*/
}