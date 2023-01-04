import Head from "next/head";
import styles from '../styles/home.module.scss'
import logoImg from '../../public/pizza_svg_logo.svg'
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";



export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warn("Preencha os campos corretamente")
      return;
    }

    setLoading(true);

    await signIn({ email, password });
   

    setLoading(false);
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
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />


            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />

            <Button
              type="submit"
              loading={loading}
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


export const getServerSideProps = canSSRGuest(async (context)=>{

  return {
    props:{}
  }
})