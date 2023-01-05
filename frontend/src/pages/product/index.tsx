import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, useState } from "react";


export default function Product() {

    const [imgProductURL, setImgProductURL] = useState('');
    const [imgProduct, setImgProduct] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (!event.target.files) { return; }
        const image = event.target.files[0];
        if (!image) { return; }
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImgProduct(image);
            setImgProductURL(URL.createObjectURL(event.target.files[0]));
        }

    }


    return (

        <>

            <Head>
                <title>Novo produto</title>
            </Head>
            <Header />

            <div className={styles.container}>
                <main>
                    <h1>Cadastrar novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelUpload}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                            {imgProductURL && (
                                <img className={styles.previewImgProduct}
                                    src={imgProductURL}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>


                        <select>
                            <option>Bebida</option>
                            <option>Pizza</option>
                        </select>

                        <input className={styles.input} type="text" placeholder="Digite o nome do produto" />
                        <input className={styles.input} type="text" placeholder="Preço R$" />
                        <textarea className={styles.input} placeholder="Descrição do produto" />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>

                    </form>

                </main>

            </div>

        </>


    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})