import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"
import Modal from 'react-modal'

type OrderProps = {
    id: string;
    table: number | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface OrderListProps {
    orders: OrderProps[];
}

type OrderDetailsProps = {
    id: string,
    amount: number,
    product_id: string
    product:{
        id: string,
        name: string,
        description: string,
        price: string,
        banner: string
    }
    order:{
        id: string,
        table: string | number,
        status: boolean,
        name: string | null;
    }

}

export default function Dashboard({ orders }: OrderListProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderDetailsProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleOpenOrderDetails(id: string) {
        console.log("Teste" + id)
    }

    Modal.setAppElement('#__next');


    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Header></Header>


            <main className={styles.container}>

                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#3fffa3" />
                    </button>
                </div>


                {
                    orders.map(item => (

                        <article key={item.id} className={styles.listOrders}>

                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => { handleOpenOrderDetails(item.id) }}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>

                        </article>

                    ))
                }



            </main>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context);
    const response = await apiClient.get('order/list-pending');


    return {
        props: {
            orders: response.data
        }
    }

})