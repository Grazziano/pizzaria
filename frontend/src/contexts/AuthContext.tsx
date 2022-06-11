import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import {
  destroyCookie,
  setCookie,
  parseCookies,
} from '../../node_modules/nookies/dist/index';
import Router from '../../node_modules/next/router';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch (error) {
    console.log('erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mes
        path: '/', // Quais caminhos terao acesso ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      // passar para proximas requisicoes o token
      api.defaults.headers['Authorization'] = `Baerer ${token}`;

      // redirecionar o user para /dashboard
      Router.push('/dashboard');
    } catch (error) {
      console.log('Erro ao acessar ', error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
