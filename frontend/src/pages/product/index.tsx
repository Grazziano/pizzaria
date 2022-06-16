import Head from 'next/head';
import { Header } from '../../components/Header';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

export default function Product() {
  return (
    <>
      <Head>
        <title>Novo Produto - Best Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <select>
              <option value="">Pizzas</option>
              <option value="">Bebida</option>
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
            />

            <textarea
              placeholder="Descreva o produto..."
              className={styles.input}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
