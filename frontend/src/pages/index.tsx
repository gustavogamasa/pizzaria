import Head from "next/head";
import styles from '../styles/home.module.scss'
import logoImg from '../../public/pizza_svg_logo.svg'
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";



export default function Home() {

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    let testData = {
      email: "email@email.com",
      password: "123"
    }

    signIn(testData);

  }



  return (

    <>


      <Head>
        <title>Sistema - Pizzaria</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="logo" />

        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
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

          <Link legacyBehavior href="/signup">
            <a className={styles.text}>Cadastre-se</a>
          </Link>

        </div>



      </div>


    </>
  )
}