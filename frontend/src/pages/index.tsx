import Head from "next/head";
import styles from '../styles/home.module.scss'
import logoImg from '../../public/pizza_svg_logo.svg'
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";



export default function Home() {
  return (

    <>


      <Head>
        <title>Sistema - Pizzaria</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo" />

        <div className={styles.login}>
          <form>
            <Input
              placeholder="Email"
              type="text"
            />


            <Input
              placeholder="Senha"
              type="password"
            />
            
            <Button 
            type="submit"
            loading={true}
            >
              Acessar
            </Button>
          </form>


        </div>



      </div>


    </>
  )
}