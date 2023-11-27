<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import session from "../session.js";
  import Loader from "../Components/Loader.svelte";
  import { link } from "svelte-spa-router";
  session.session();

  let user = null;

  let posts = [];
  let error = null;

  const getUser = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .post("http://localhost/sveltephp/posts/user.php?token=" + token)
      .then((res) => {
        user = res.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("photo", JSON.stringify(res.data.foto));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const promesa = async () => {
    const res = await fetch("http://localhost/sveltephp/posts/posts.php");
    posts = await res.json();
    if (res.ok) {
      error = null;
      return posts;
    } else {
      error = "Ooops!, something went wrong";
      posts = [];
      throw new Error("Ooops!, something went wrong");
    }
  };

  onMount(() => {
    getUser();
    promesa();
  });
</script>

<h1>Welcome {user}</h1>

{#if posts.length === 0 && error === null}
  <div align="center">
    <Loader />
  </div>
{:else if posts.length > 0}
  {#each posts as post}
    <div class="row">
      <div class="col s1">
        <img src={post.foto} alt="" width="50" height="50" />
      </div>
      <div class="col s11">
        <b>{post.usuario}</b>
        <h5>{post.titulo}
          {#if post.usuario === user}
            <a href="/edit/{post.id}" use:link
              ><i class="material-icons">edit</i></a
            >
          {/if}
        </h5>
        <p>{post.post}</p>
        <hr />
      </div>
    </div>
  {:else}
    <p>No hay datos en la db</p>
  {/each}
{:else}
  <p>{error}</p>
{/if}
