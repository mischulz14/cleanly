import cookie from 'cookie';
import Cookies from 'js-cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 1 day (in seconds)

  return cookie.serialize('sessionToken', token, {
    httpOnly: true,
    path: '/',
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    secure: isProduction,
    sameSite: 'lax',
  });
}

export function createUserIdCookie(userId: string) {
  // check if we are in production
  const isProduction = process.env.NODE_ENV === 'production';

  return cookie.serialize('userId', userId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week (in seconds)
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    secure: isProduction,
    sameSite: 'lax',
  });
}

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (err) {
    return undefined;
  }
}
