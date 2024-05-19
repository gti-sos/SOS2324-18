<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>


</svelte:head>




<script>  

import {onMount} from "svelte";
import {dev} from "$app/environment";
import { Button,Container,Accordion, AccordionItem,Alert, Card} from '@sveltestrap/sveltestrap';

</script>

<style>
    @import '/style.css';
</style>

<Container>
<h1>Que usuario quiere elegir?</h1>
    <div class="container" style="display: grid; grid-template-columns: 33% 33% 33%">
        
        <div class="card">
            <div class="photo">
                <a href="http://sos2324-18.appspot.com/integrations/carbeario"><img src = "https://th.bing.com/th/id/OIP.cbVEYW64oNlc7QA8PK6ETAAAAA?rs=1&pid=ImgDetMain" alt="Imagen" style="max-width: 100%;max-height: 100%;display: block;"></a>
            </div>
            <Card><h3>Carlos</h3></Card>
        </div>
        <div class="card">
            <div class="photo">
                <a href="http://sos2324-18.appspot.com/integrations/josgarvar3"><img src = "https://magicinternacional.com/wp-content/uploads/2024/03/Karles-Torah-e1711897452974.jpeg" alt="Imagen" style="max-width: 100%;max-height: 100%;display: block;"></a>
            </div>
            <Card><h3>Jose Joaquin</h3></Card>
        </div>
        <div class="card">
            <div class="photo">
                <a href="http://sos2324-18.appspot.com/integrations/migmormar7"><img src = "https://eu-images.contentstack.com/v3/assets/blt949ea8e16e463049/blt52227f88e63c070f/63f7c2fb7a5dad10a32cbeb0/BCD158.jpg" alt="Imagen" style="max-width: 100%;max-height: 100%;display: block;"></a>
            </div>
            <Card><h3>Miguel</h3></Card>
        </div>
    </div>   

</Container>
