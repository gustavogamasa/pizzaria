import Head from "next/head";
import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/pizza_svg_logo.svg'
import Image from "next/image";
import { Input } from "../../components/ui/Input/";
import { Button } from "../../components/ui/Button";
import Link from "next/link";



export default function SignUp() {
  return (

    <>


      <Head>
        <title>Novo cadastro</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="logo" />

        <div className={styles.login}>
          <h2>Nova conta</h2>
    
          <form>
            <Input
              placeholder="Seu nome"
              type="text"
            />

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
            loading={false}
            >
              Acessar
            </Button>
          </form>

          <Link legacyBehavior href="/">
          <a className={styles.text}>Já tem uma conta? Faça login</a>          
          </Link>

        </div>



      </div>


    </>
  )
}