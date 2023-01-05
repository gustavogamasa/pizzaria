import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { api } from "../../services/apiClient";

type CategoryProps = {
    id: string;
    name: string;
}

interface CategoryListProps {
    categoryList: CategoryProps[];
}


export default function Product({ categoryList }: CategoryListProps) {



    const [imgProductURL, setImgProductURL] = useState('');
    const [imgProduct, setImgProduct] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    function resetFields(){
        setImgProduct(null);
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setImgProductURL('');
    }


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

    function handleChangeCategory(e) {
        setCategorySelected(e.target.value);
    }

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        try {

            if (productName === '' || productPrice === '' || productDescription === '' || imgProduct === null) {
                toast.warn("Por favor, preencha todos os campos");
                return;
            }

            const data = new FormData();
            
            data.append('name', productName);
            data.append('price', productPrice);
            data.append('description', productDescription);
            data.append('file', imgProduct);
            data.append('category_id', categories[categorySelected].id);

            const api = setupAPIClient();
            api.post('/product/create', data);
            toast.success('Produto cadastrado com sucesso!');
            resetFields();



        } catch (error) {
            console.log(error);
            toast.error("Ops! Erro ao cadastrar")
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

                    <form className={styles.form} onSubmit={handleRegister}>

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


                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })
                            }

                        </select>

                        <input className={styles.input} type="text" placeholder="Digite o nome do produto"
                            value={productName} onChange={(e) => (setProductName(e.target.value))} />

                        <input className={styles.input} type="text" placeholder="Preço R$"
                            value={productPrice} onChange={(e) => { setProductPrice(e.target.value) }} />

                        <textarea className={styles.input} placeholder="Descrição do produto"
                            value={productDescription} onChange={(e) => { setProductDescription(e.target.value) }} />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>

                    </form>

                </main>

            </div>

        </>


    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('/category/list-all');

    return {
        props: {
            categoryList: response.data
        }
    }
})