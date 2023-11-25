import Login from './Login/Login.svelte';
import Register from './Login/Register.svelte';
import ErrorRoute from './Login/ErrorRoute.svelte';
import Home from './Main/Home.svelte';
import Save from './Main/Save.svelte';
import Edit from './Main/Edit.svelte';

const routes = {
    '/': Login,
    '/register': Register,
    '/home': Home,
    '/save': Save,
    '/edit/:id': Edit,
    '*' : ErrorRoute
}

export default routes;