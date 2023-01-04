import Head from "next/head"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from '../../components/Header'

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>

            <Header></Header>


            <h1>Dashboard</h1>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})