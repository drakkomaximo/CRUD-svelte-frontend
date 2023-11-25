import { token } from './store.js';
import { push } from 'svelte-spa-router';

const session = {
    session: () => {
        const ls = localStorage.getItem('token');
        if(ls !== null) {
            token.set(true);
        }else{
            token.set(false);
            push('/login');
        }
    }
}

export default session;