import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

type SignOptions = any;

const BASE_OPTIONS: SignOptions = {
  issuer: process.env.BASE_URL || '',
  audience: process.env.BASE_URL || '',
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class TokenService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };

    return this.jwtService.signAsync({}, opts);
  }

  async generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const opts: SignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(user.id),
    };

    return this.jwtService.signAsync({}, opts);
  }

  // private async jwtToken(user: User): Promise<string> {
  //   const payload = { username: user.name, sub: user.id };

  //   return this.jwtService.signAsync(payload);
  // }

  async resolveRefreshToken(encoded: string): Promise<{ user: User }> {
    const payload = await this.decodeRefreshToken(encoded);

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user };
  }

  async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException('Refresh token expired');
    }
  }

  async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.userService.findUserById(subId);
  }
}
