import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi'
import logoImg from '../../../public/pizza_logo.png'
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSpinner } from 'react-icons/fa';

export function Header() {


    const { user, signOut } = useContext(AuthContext);



    return (
        <header className={styles.headerContainer}>

            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src={logoImg} alt="logo" height={50} className={styles.logo}>
                    </Image>
                </Link>
                
                <div className={styles.userName}>

                <h3>Bem vindo, {user?.name}</h3>

                </div>

                <nav className={styles.menuNav}>

                    <Link href="/category">
                        Categoria
                    </Link>

                    <Link href="/product">
                        Cardápio
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#FFF' size={24}>
                        </FiLogOut>
                    </button>

                </nav>

            </div> {/* headerContent */}


        </header>
    )
}