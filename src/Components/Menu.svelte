<script>
  import { link, push } from "svelte-spa-router";
  import axios from "axios";
  import { token } from "../store";

  const logout = () => {
    const tokenphp = JSON.parse(localStorage.getItem("token"));
    axios
      .post("http://localhost/sveltephp/login/logout.php?token=" + tokenphp)
      .then((res) => {
        if (res.data === "success") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("photo");
          token.set(false);
          push("/");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
</script>

<nav class="red">
  <div class="nav-wrapper">
    <h5 class="brand-logo">CRUD Svelte-PHP</h5>
    {#if $token}
      <ul class="right hide-on-med-and-down">
        <li><a href="/home" use:link>Home</a></li>
        <li><a href="/save" use:link>Save</a></li>
        <li><a href="#" on:click={logout}>Log out</a></li>
      </ul>
    {/if}
  </div>
</nav>
