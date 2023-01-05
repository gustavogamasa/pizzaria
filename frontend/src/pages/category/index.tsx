import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { canSSRAuth } from '../../utils/canSSRAuth';
import style from './style.module.scss'



export default function Category() {

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') {return;}

        const apiClient = setupAPIClient();
        await apiClient.post('/category/create', {
            name: name
        })
        
        toast.success("Categoria "+name+" cadastrada com sucesso");
        setName('');

    }

    return (

        <>

            <Head>
                <title>Nova Categoria</title>
            </Head>

            <Header></Header>

            <main className={style.container}>
                <h1>Cadastrar categoria</h1>

                <form className={style.form} onSubmit={handleRegister}>
                    <input type="text"
                        className={style.input}
                        placeholder="Nome da nova categoria"
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />

                    <button type='submit' className={style.buttonAdd}>
                        Cadastrar
                    </button>
                </form>



            </main>


        </>

    );

}

export const getServerSideProps = canSSRAuth(async () => {
    return {
        props: {}
    }
})