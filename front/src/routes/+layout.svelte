<script>
    import Header from "./header.svelte";
    import { Styles } from '@sveltestrap/sveltestrap';
    import { Button, Icon, colorMode } from '@sveltestrap/sveltestrap';

</script>
    
    
<Styles/>  
<Header/>
<h1>Bienvenido!</h1>
<Button color="primary" outline active={$colorMode === 'light'} on:click={() => ($colorMode = 'light')}>
light <Icon name="sun-fill" />
</Button>
<Button color="primary" outline active={$colorMode === 'dark'} on:click={() => ($colorMode = 'dark')}>
dark <Icon name="moon-stars-fill" />
</Button>
<p></p>
<slot></slot>


