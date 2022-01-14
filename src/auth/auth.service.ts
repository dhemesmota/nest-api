import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    const valid = user ? compareSync(data.password, user.password) : false;

    if (!valid) {
      throw new UnauthorizedException('E-mail ou senha incorreto.');
    }

    // const token = await this.jwtToken(user);
    const token = await this.tokenService.generateAccessToken(user);

    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 7,
    );

    return {
      user,
      token,
      refreshToken,
    };
  }

  // private async jwtToken(user: User): Promise<string> {
  //   const payload = { username: user.name, sub: user.id };

  //   return this.jwtService.signAsync(payload);
  // }

  async refreshToken(refreshToken: string): Promise<AuthType> {
    const { user, token } =
      await this.tokenService.createAccessTokenFromRefreshToken(refreshToken);

    return {
      user,
      token,
    };
  }
}
