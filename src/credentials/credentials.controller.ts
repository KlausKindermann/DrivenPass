import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import CreateCredentialDto from './dto/create-credential.dto';
import { AuthGuard } from '../guards/guards';
import { User } from '../decorators/user.decorator';


@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {

  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  createCredential(@Body() createCredentialDto: CreateCredentialDto, @User() user) {
    try {
      return this.credentialsService.createCredential(createCredentialDto, user);
    } catch (error) {
      if (error.message === 'CONFLICT') {
        throw new HttpException('Cannot create credential', HttpStatus.CONFLICT)
      }
    }
  }

  @Get()
  findAllCredential(@User() user) {
    return this.credentialsService.findAllCredential(user);
  }

  @Get(':id')
  findOneCredential(@Param('id') id: string, @User() user) {
    try {
      return this.credentialsService.findOneCredential(Number(id), user);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('Credential has not been found', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('This credential does not belong to you', HttpStatus.FORBIDDEN)
      }
    }
  }

  @Delete('/:id')
  deleteCredential(@Param('id') id: string, @User() user) {
    try {
      return this.credentialsService.deleteCredential(Number(id), user);
    } catch (error) {
      if (error.message === 'NOT FOUND') {
        throw new HttpException('Credential has not been found', HttpStatus.NOT_FOUND)
      } else if (error.message === 'FORBIDDEN') {
        throw new HttpException('This credential does not belong to you', HttpStatus.FORBIDDEN)
      }
    }
  }
}
