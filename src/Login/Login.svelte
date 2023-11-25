<script>
    import { link, push } from "svelte-spa-router";
    import InputCustom from "../Components/InputCustom.svelte";
    import axios from "axios";
    import Swal from "sweetalert2";

    const ls = localStorage.getItem('token');
    $: if (ls !== null) {
        push('/home');
    }

    const login = () => {
        const form = document.getElementById('loginForm');
        const data = new FormData(form);
        axios.post('http://localhost/sveltephp/login/login.php', data)
            .then(res => {
                if (res.data.res === 'success') {
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    push('/home');
                }else{
                    localStorage.removeItem('token');
                    localStorage.clear();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email or password incorrect!'
                    })
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            })
    }
</script>
<h1>Login</h1>
<form on:submit|preventDefault={login} id="loginForm" autocomplete="off">
    <InputCustom type="email" name="email" id="email" label="Email" icon="account_circle" />
    <InputCustom type="password" name="password" id="password" label="Password" icon="https" />
    <button type="submit" class="btn green">Log in</button>
    <a href="/register" use:link class="btn blue">Register</a>
</form>