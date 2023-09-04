import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import CreateCredentialDto from './dto/create-credential.dto';
import { AuthGuard } from '../guards/guards';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Credentials')
@Controller('credentials')
export class CredentialsController {

  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  @ApiOperation({ summary: 'It creates a new credential for the user, regarding the business restritions related to this feature' })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Credential has been created" })
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
  @ApiOperation({ summary: 'It retrieves all users credentials ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Credentials retrieved" })
  findAllCredential(@User() user) {
    return this.credentialsService.findAllCredential(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'It retrieves a credential, as long as it belongs to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Credentials retrieved" })
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
  @ApiOperation({ summary: 'It deletes a specific credential, as long as it belongs to the user ' })
  @ApiResponse({ status: HttpStatus.OK, description: "Credential has been deleted" })
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
