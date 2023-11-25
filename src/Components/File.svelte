<script>
    export let name;
</script>

<div class="file-field input-field">
  <div class="btn">
    <span>{name}</span>
    <input type="file" name={name} />
  </div>
  <div class="file-path-wrapper">
    <input class="file-path validate" type="text" />
  </div>
</div>
