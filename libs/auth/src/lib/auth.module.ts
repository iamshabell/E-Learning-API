import { DataModule } from '@caawiye/data'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    DataModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
