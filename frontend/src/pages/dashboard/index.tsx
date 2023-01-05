import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"

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

export default function Dashboard({ orders }: OrderListProps) {

    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenOrderDetails(id: string) {
        console.log("Teste"+id)

    }


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
    console.log(response.data);

    return {
        props: {
            orders: response.data
        }
    }

})