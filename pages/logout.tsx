import cookie from 'cookie';
import { deleteSessionByToken } from '../data/sessions';

const LogoutPage = () => {
  return <></>;
};

export default LogoutPage;

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    await deleteSessionByToken(token);

    context.res.setHeader('Set-Cookie', [
      cookie.serialize('sessionToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      }),
      cookie.serialize('userId', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      }),
    ]);
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
