import Head from "next/head";
import styles from '../../styles/home.module.scss'
import logoImg from '../../../public/pizza_svg_logo.svg'
import Image from "next/image";
import { Input } from "../../components/ui/Input/";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { FormEvent, useState } from "react";



export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(event: FormEvent){

      if(name === '' || email === '' || password === ''){
        alert("Preencha todos os campos");
        return;
      }
      
      event.preventDefault();

      setLoading(true);

    }

    


  return (

    <>


      <Head>
        <title>Novo cadastro</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image className={styles.logo} src={logoImg} alt="logo" />

        <div className={styles.login}>
          <h2>Nova conta</h2>
    
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Seu nome"
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />


            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            
            <Button 
            type="submit"
            loading={loading}
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