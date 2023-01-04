import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi'
import logoImg from '../../../public/pizza_logo.png'
import Image from 'next/image';

export function Header() {
    return (
        <header className={styles.headerContainer}>

            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src={logoImg} alt="logo" height={50} className={styles.logo}>
                    </Image>
                </Link>

                <nav className={styles.menuNav}>

                    <Link href="/category">
                        Categoria
                    </Link>

                    <Link href="/product">
                        Cardápio
                    </Link>

                    <button>
                        <FiLogOut color='#FFF' size={24}>
                        </FiLogOut>
                    </button>

                </nav>

            </div> {/* headerContent */}


        </header>
    )
}