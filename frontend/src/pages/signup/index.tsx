import { FormEvent, useContext, useState } from 'react';

import Head from '../../../node_modules/next/head';
import Image from '../../../node_modules/next/image';
import styles from '../../../styles/Home.module.scss';

import logoImg from '../../../public/logo.png';

import { Input } from '../../components/ui/Input/index';
import { Button } from '../../components/ui/Button/index';
import { AuthContext } from '../../contexts/AuthContext';

import Link from '../../../node_modules/next/link';
// import { toast } from '../../../node_modules/react-toastify/dist/index';
const { toast } = require('react-toastify');

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  // function stopForm (event) {
  //   console.log('Chamou o stopForm');
  //   event.preventDefault();
  //   console.log('Acabou o stopForm');
  // }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login!</a>
          </Link>
        </div>
      </div>
    </>
  );
}
