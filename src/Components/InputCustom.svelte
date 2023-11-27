<script>
    export let value = '';
    export let type = 'text';
    export let name;
    export let icon;
    export let id;
    export let label;
    export let isEdit = false;
</script>

<div class="input-field">
    <i class="material-icons prefix">{icon}</i>
    <input {type} {name} {id} required {value} on:input>
    {#if !isEdit}
    <label for="{id}">{label}</label>
    {/if}
</div>