import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

// função para paginas que só pode ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    // Se o cara tentar acessar a pagina porem já tendo login salvo redirecionamos
    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    return await fn(context);
  };
}
