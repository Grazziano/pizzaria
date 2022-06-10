import Head from '../../node_modules/next/head';
import Image from '../../node_modules/next/image';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.png';

import { Input } from '../components/ui/Input/index';
import { Button } from '../components/ui/Button/index';

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Pizza - Faca seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form action="">
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Sua senha" type="password" />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
