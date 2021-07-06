import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as jwksRSA from 'jwks-rsa';
import { AuthService } from './auth.service';
import { JwtContxt } from './interfaces/jwt.contxt.interface';

const jwksClient = jwksRSA({
  jwksUri: 'http://contxtauth.com/v1/.well-known/jwks.json',
});

/**
 * Gets the signing key from Contxt
 * @param {Request} request
 * @param {JwtContxt} jwtToken
 * @param {Function} done
 */
const verifyJwtToken = (
  request: Request,
  jwtToken: JwtContxt,
  done: Function,
): void => {
  jwksClient.getSigningKey(jwtToken.kid, (err, key) => {
    if (err) {
      done(err, null);
    }

    const signingKey = key.getPublicKey();
    done(null, signingKey);
  });
};

/**
 * Passport strategy to use Contxt keys to authorize requests
 * @param {Strategy}
 * @param {AuthService}
 * @exports JwtStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignore expiration for now
      ignoreExpiration: true,
      issuer: 'https://contxtauth.com/v1/',
      secretOrKeyProvider: verifyJwtToken,
    });
  }

  async validate(payload: { sub: string }): Promise<object> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
