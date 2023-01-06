import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from "../../services/api"
import { useState } from "react"
import Modal from 'react-modal'
import ModalOrder from "../../components/ModalOrder"
import { toast } from "react-toastify"

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

export type OrderDetailsProps = {
    id: string,
    amount: number,
    product_id: string
    product: {
        id: string,
        name: string,
        description: string,
        price: string,
        banner: string
    }
    order: {
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



    async function handleOpenOrderDetails(id: string) {
        console.log(id)


        const apiClient = setupAPIClient();
        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        });

        setModalItem(response.data);
        console.log(response)
        setModalVisible(true);

    }




    function handleCloseDetails() {
        setModalVisible(false);
    }

    async function handleClickRefresh(){
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/order/list-pending');
        setOrderList(response.data);

    }


    async function handleFinishOrder(order_id: string) {

        const apiClient = setupAPIClient();
        try {

            const response = await apiClient.put('order/finish', {
                order_id: order_id
            })
            toast.success("Pedido da mesa " + response.data.table + " concluído com sucesso!");


        } catch (error) { console.log(error)

        }

        const response = await apiClient.get('/order/list-pending');
        setOrderList(response.data);
        setModalVisible(false);

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
                    <h1>Pedidos pendentes</h1>
                    <button>
                        <FiRefreshCcw size={25} color="#3fffa3" onClick={handleClickRefresh} />
                    </button>
                </div>

                {
                    orderList.length === 0 && (
                        <span className={styles.textNoOrdersPending}>Não há pedidos pendentes no momento</span>
                    )
                }


                {
                    orderList.map(item => (

                        <article key={item.id} className={styles.listOrders}>

                            <section key={item.id} className={styles.orderItem}>
                                <button onClick={() => { handleOpenOrderDetails(item.id) }}>
                                    <div className={styles.tag}></div>
                                    <span>Mesa {item.table} - {item.name} </span>
                                </button>
                            </section>

                        </article>

                    ))
                }



            </main>

            {
                modalVisible && (
                    <ModalOrder
                        isOpen={modalVisible}
                        handleCloseDetails={handleCloseDetails}
                        order={modalItem}
                        handleFinishOrderModal={handleFinishOrder}
                    />
                )
            }

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