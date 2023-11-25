<script>
    import Router from 'svelte-spa-router'
    import routes from './routes.js'
    import Menu from './Components/Menu.svelte'
</script>

<Menu />

<div class="container">
    <Router {routes} />
</div>