import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.png" width={190} height={60} alt="" />
        </Link>

        <h1>{user?.name}</h1>

        <nav className={styles.menuNav}>
          <Link href="/category">
            <a>Categoria</a>
          </Link>

          <Link href="/product">
            <a>Cardápio</a>
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
