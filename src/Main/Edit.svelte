<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import InputCustom from "../Components/InputCustom.svelte";
  import Swal from "sweetalert2";
  import { push } from "svelte-spa-router";
  import session from "../session.js";
  session.session();

  export let params = {};
  const id = params.id;
  let post = {};

  const getPost = () => {
    axios
      .get("http://localhost/sveltephp/posts/post.php?id=" + id)
      .then((res) => {
        post = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const edit = () => {
    const form = document.getElementById("editForm");
    const data = new FormData(form);
    axios
      .post("http://localhost/sveltephp/posts/editPost.php", data)
      .then((res) => {
        if (res.data == "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "The post has been edited",
            showConfirmButton: false,
            timer: 1500,
          });
          push("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "oops, the post could not be edited",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost/sveltephp/posts/deletePost.php?id=" + id)
          .then((res) => {
            if (res.data == "success") {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "The post has been deleted",
                showConfirmButton: false,
                timer: 1500,
              });
              push("/home");
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "oops, the post could not be deleted",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  onMount(() => {
    getPost();
  });
</script>

<h1>Edit a Post</h1>
<form on:submit|preventDefault={edit} id="editForm" autocomplete="off">
  <input type="hidden" name="id" value={id} />

  <InputCustom
    id="title"
    name="title"
    icon="title"
    label="Title of post"
    isEdit={true}
    value={post.titulo}
  />
  <InputCustom
    id="post"
    name="post"
    icon="comment"
    label="Write a post"
    isEdit={true}
    value={post.post}
  />
  <button type="submit" class="btn blue">Edit Post</button>
</form>
<hr>
<button class="btn red" on:click={deletePost}>Delete Post</button>
