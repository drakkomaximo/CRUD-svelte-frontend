<script>
  import { link, push } from "svelte-spa-router";
  import InputCustom from "../Components/InputCustom.svelte";
  import File from "../Components/File.svelte";
  import Swal from "sweetalert2";
  import axios from "axios";

  let pass = "";
  let pass2 = "";
  let email = "";
  let show = false;

  const register = () => {
    if (pass !== pass2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    } else {
      const form = document.getElementById("registerForm");
      const data = new FormData(form);
      axios
        .post("http://localhost/sveltephp/login/register.php", data)
        .then((res) => {
          console.log(res.data);
          if (res.data === "success") {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "You have been registered!",
            });
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
    }
  };

  const validateEmail = () => {
    if (email !== "") {
      const dataEmail = new FormData();
      dataEmail.append("email", email);
      axios
        .post("http://localhost/sveltephp/login/validationEmail.php", dataEmail)
        .then((res) => {
          if (res.data === "success") {
            show = true;
          } else {
            show = false;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email already exists!",
            });
          }
        });
    }
  };
</script>

<h1>Register</h1>
<form
  on:submit|preventDefault={register}
  id="registerForm"
  autocomplete="off"
  enctype="multipart/form-data"
>
  <div class="input-field">
    <i class="material-icons prefix">email</i>
    <input type="email" name="email" id="email" required bind:value={email} on:blur={validateEmail} />
    <label for="email">Email</label>
  </div>
  <InputCustom
    type="password"
    name="password"
    id="password"
    label="Password"
    icon="https"
    value={pass}
    on:input={(e) => (pass = e.target.value)}
  />
  <InputCustom
    type="password"
    name="password2"
    id="password2"
    label="Confirm password"
    icon="https"
    value={pass2}
    on:input={(e) => (pass2 = e.target.value)}
  />
  <InputCustom name="user" id="user" label="User" icon="account_circle" />
  <File name="photo" />
  {#if show}
    <button type="submit" class="btn green">Register</button>
  {/if}
  <a href="/" use:link class="btn blue">Login</a>
</form>
