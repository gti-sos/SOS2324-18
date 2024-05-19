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

    .video-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
      
    .video-container iframe {
      width: 1450px;
      height: 590px;
    }
     
    @media (max-width: 600px) {
  
      .video-container iframe {
        width: 100%;
        height: auto;
          }
  
    }
  
  </style>
      
 
<Container>

<h1>Videos de cada uno de los participantes</h1>
<div class="video-container">     
    <h3>Video CARLOS BEATO RIOJA</h3>
    <iframe  width="300" height="300" src="https://www.youtube.com/embed/xF5XLFOemq0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>              
</div>
<div class="video-container">     
    <iframe  width="300" height="300" src="https://www.youtube.com/embed/f7ywF7VvbOw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>              
    <h3>Video JOSÉ JOAQUÍN GARRIDO VARGAS</h3>
</div>
<div class="video-container">     
    <h3>Video MIGUEL MORENO MARTÍN-PALOMO</h3>
    <iframe  width="300" height="300" src="https://youtu.be/T3TjNhEtPZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>              
</div>

        
        
        
       

</Container>
