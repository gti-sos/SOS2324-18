<script>
    import Header from "./header.svelte";
    import { CardText, Styles } from '@sveltestrap/sveltestrap';
    import { Button, Icon, colorMode, Card, Container } from '@sveltestrap/sveltestrap';

</script>
    
<svelte:head>
    <title>SOS2324-18</title>
</svelte:head>

<Styles/>  
<Header/>
<Card theme="auto">
    <CardText>
    <h2>Bienvenido! 
        <Button color="primary" outline active={$colorMode === 'light'} on:click={() => ($colorMode = 'light')}>
        Claro <Icon name="sun-fill" />
        </Button>
        <Button color="primary" outline active={$colorMode === 'dark'} on:click={() => ($colorMode = 'dark')}>
        Oscuro <Icon name="moon-stars-fill" />
        </Button>
    </h2>
    </CardText>
</Card>

<p></p>
<slot></slot>


