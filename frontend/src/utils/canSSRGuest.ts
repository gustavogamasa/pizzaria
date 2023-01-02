import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';



export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {


        const cookies = parseCookies(context);

        if (cookies['@pizzaAuth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }



        return await fn(context);
    }
}