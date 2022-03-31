import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { JwtDto } from '../dto/jwt.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwtSecret'),
    })
  }

  async validate(payload: JwtDto) {
    const user = await this.service.validateUser(payload.userId)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
