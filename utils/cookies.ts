import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 1 day (in seconds)

  return cookie.serialize('registerSessionToken', token, {
    httpOnly: true,
    path: '/',
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    secure: isProduction,
    sameSite: 'lax',
  });
}
