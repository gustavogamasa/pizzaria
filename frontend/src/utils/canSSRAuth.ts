import { destroyCookie } from 'nookies';
import { AuthTokenError } from './../services/errors/AuthTokenError';
import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookie = parseCookies(context);

        const token = cookie['@pizzaAuth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        } try {
            return await fn(context);
        } catch (error) {

            if(error instanceof AuthTokenError){
                destroyCookie(context, '');
                return {
                    redirect:{
                        destination:'/',
                        permanent: false
                    }
                }
            }

        }


    }
}