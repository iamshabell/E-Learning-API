import { DataService } from '@caawiye/data'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AuthHelper } from './auth.helper'
import { AuthLoginInput } from './dto/auth-login.input'
import { AuthRegisterInput } from './dto/auth-register.input'
import { UserToken } from './models/user-token'

@Injectable()
export class AuthService {
  constructor(private readonly data: DataService) {}

  public async login(input: AuthLoginInput): Promise<UserToken> {
    const found = await this.data.findUserByEmail(input.email)

    if (!found) {
      throw new NotFoundException(`this email is not exist`)
    }

    const validPassword = await AuthHelper.validate(input.password, found.password)

    if (!validPassword) {
      throw new Error(`password is not valid`)
    }
    return { user: found, token: this.signToken(found.id) }
  }

  public async register(input: AuthRegisterInput): Promise<UserToken> {
    const found = await this.data.findUserByEmail(input.email)

    if (found) {
      throw new BadRequestException(`this email is already registered`)
    }

    const password = await AuthHelper.hash(input.password)

    const created = await this.data.user.create({
      data: { ...input, password },
    })

    return { user: created, token: this.signToken(created.id) }
  }

  private signToken(id: string) {
    return 'token'
  }
}
