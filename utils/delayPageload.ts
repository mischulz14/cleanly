import { Router } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export function handlePagedelay(
  router: Router,
  e: Event,
  setLoading: Dispatch<SetStateAction<boolean>>,
) {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/');
  }, 3000);
}
