import styles from './styles.module.scss';
import Modal from 'react-modal';

import { FiX } from 'react-icons/fi';
import { OrderDetailsProps } from '../../pages/dashboard';



interface ModalOrderProps {
    isOpen: boolean,
    handleCloseDetails: () => void;
    order: OrderDetailsProps[];
    handleFinishOrderModal: (id: string) => void; 
}

export default function ModalOrder({ isOpen, handleCloseDetails, order, handleFinishOrderModal }: ModalOrderProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    };


    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={handleCloseDetails}
            style={customStyles}>

            <button
                type='button'
                onClick={handleCloseDetails}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}>
                <FiX size={45} color="#f34748"></FiX>
            </button>

            <div className={styles.container}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa <strong> {order[0].order.table} - {order[0].order.name}</strong>
                </span>

                {
                    order.map(item => (
                        <section key={item.id} className={styles.containerItem}>
                            <span><strong>{item.product.name}</strong>  x  {item.amount} </span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))
                }

                <button className={styles.buttonComplete} onClick={() => { handleFinishOrderModal(order[0].order.id)}}>
                    Concluir pedido
                </button>
            </div>

        </Modal>

    )
}