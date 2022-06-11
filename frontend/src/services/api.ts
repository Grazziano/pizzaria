import axios, { AxiosError } from '../../node_modules/axios/index';
import { parseCookies } from '../../node_modules/nookies/dist/index';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // TODO Qualquer erro 401 (não autorizado) devemos deslogar o usuário
        if (typeof window !== undefined) {
          // Chamar a funcao para deslogar o usuário
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
