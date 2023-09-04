import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import CreateCredentialDto from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { User } from '../decorators/user.decorator';

@Injectable()
export class CredentialsService {

  constructor(private readonly repository: CredentialsRepository) { }

  async createCredential(credential: CreateCredentialDto, @User() user) {
    const exists = await this.repository.getCredentialByTitle(credential.title)
    if (exists) {
      if (user.id === exists.userId) {
        throw new ConflictException('CONFLICT')
      } else {
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        const encryptedString = cryptr.encrypt(credential.password);
        const body = { title: credential.title, userId: user.id, username: credential.username, password: encryptedString, url: credential.url }
        return await this.repository.createCredential(body)
      }
    } else {
      const Cryptr = require('cryptr');
      const cryptr = new Cryptr(process.env.JWT_SECRET);
      const encryptedString = cryptr.encrypt(credential.password);
      const body = { title: credential.title, userId: user.id, username: credential.username, password: encryptedString, url: credential.url }
      return await this.repository.createCredential(body)
    }
  }

  async findAllCredential(@User() user) {
    const credentials = []
    const info = await this.repository.findAllCredential(user.id)
    if (info.length === 0) {
      return credentials;
    } else {
      for (let i = 0; i < info.length; i++) {
        let credential = info[i];
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr('myTotallySecretKey');
        const decryptedString = cryptr.decrypt(info[i].password)
        const body = { title: credential.title, userId: credential.userId, username: credential.username, password: decryptedString, url: credential.url }
        credentials.push(body)
      }
      return credentials;
    }
  }

  async findOneCredential(id: number, @User() user) {
    const credential = await this.repository.findOneCredential(id)
    if (!credential) {
      throw new NotFoundException('NOT FOUND')
    } else {
      if (credential.userId !== user.id) {
        throw new ForbiddenException('FORBIDDEN')
      } else {
        return credential;
      }
    }
  }

  async deleteCredential(id: number, @User() user) {
    const credential = await this.repository.findOneCredential(id)
    if (!credential) {
      throw new NotFoundException('NOT FOUND')
    } else {
      if (credential.userId !== user.id) {
        throw new ForbiddenException('FORBIDDEN')
      } else {
        return this.repository.deleteCredential(id);
      }
    }
  }
}
