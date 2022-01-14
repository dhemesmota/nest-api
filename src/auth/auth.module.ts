import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES || '30s',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    TokenService,
    AuthResolver,
    UserService,
    JwtStrategy,
  ],
})
export class AuthModule {}
