import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"

type OrderProps = {
    id: string;
    table: number | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface OrderListProps {
    orderList: OrderProps[];
}

export default function Dashboard({ orderList }: OrderListProps) {
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

                }

                <article className={styles.listOrders}>

                    <section className={styles.orderItem}>
                        <button>
                            <div className={styles.tag}></div>
                            <span>Mesa 30</span>
                        </button>
                    </section>

                </article>

            </main>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context);
    const orderList = await apiClient.get('order/list-pending');
    console.log(orderList.data);

    return {
        props: {
            orderList: orderList.data
        }
    }

})