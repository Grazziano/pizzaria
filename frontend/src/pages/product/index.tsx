import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss';

type ItemProps = {
  id: string;
  name: string;
};

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  // console.log(categoryList);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvater] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    // console.log(event.target.files);
    if (!event.target.files) {
      return;
    }

    const image = event.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvater(image);
      setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  // Quando você seleciona uma nova categoria na list
  function handleChangeCategory(event) {
    // console.log('Posição da categoria selecionada ', event.target.value);
    // console.log('Categoria selecionada ', categories[event.target.value]);
    setCategorySelected(event.target.value);
  }

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
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
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
  const apiClient = setupAPIClient(context);

  const response = await apiClient.get('/category');

  // console.log(response.data);

  return {
    props: {
      categoryList: response.data,
    },
  };
});
