<script>
    import axios from 'axios';
    import Session from '../session.js';
    import InputCustom from '../Components/InputCustom.svelte';
    import Swal from 'sweetalert2';
    import { push } from 'svelte-spa-router';

    Session.session();

    const user = JSON.parse(localStorage.getItem('user'));
    const photo = JSON.parse(localStorage.getItem('photo'));

    const save = () =>{
        const form = document.getElementById('saveForm');
        const data = new FormData(form);
        axios.post('http://localhost/sveltephp/posts/highPost.php', data)
        .then(res => {
            if(res.data == 'success'){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The post has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                push('/home');
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'oops, the post could not be saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        
        })
    }
</script>

<h1>Save a Post</h1>
<form on:submit|preventDefault={save} id="saveForm" autocomplete="off">
    <input type="hidden" name="usuario" value={user}>
    <input type="hidden" name="foto" value={photo}>

    <InputCustom id="title" name="title" label="Title of post" icon="title" />
    <InputCustom id="post" name="post" label="Write a post" icon="comment" />
    <button type="submit" class="btn blue">Save Post</button>
</form>