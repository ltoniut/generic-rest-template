export interface JwtToken {
  aud: ArrayBufferLike;
  iss: string;
  sub: string;
  azp: string;
  exp: number;
  iat: number;
  permissions: object;
  organizations: ArrayBufferLike;
}
