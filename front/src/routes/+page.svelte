<script lang="ts">
    import { Container,Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle } from '@sveltestrap/sveltestrap';
  </script>

<style>
    :global(body) {
      background: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgb(0, 67, 83)),
          to(#cea29c)
        )
        fixed;
    }

</style>

<Container sm class="custom-margin">
    <Card theme="auto">
        <CardHeader>
          <CardTitle>SOS2324-18</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            <h2>Team</h2>
                <h5><a href="https://github.com/carbeario">Carlos Beato Rioja</a> - API: <a href="api/v1/regional-politicies-acceptance">api/v1/regional-politicies-acceptance</a></h5>
                <h5><a href="https://github.com/migmormar7">Miguel Moreno Martín-Palomo</a> - API: <a href="api/v1/eu-solidarity-funds">eu-solidarity-funds</a></h5>
                <h5><a href="https://github.com/JJoaquinGV19">José Joaquín Garrido Vargas</a> - API: <a href="api/v1/foods-prices-inflation">foods-prices-inflation</a></h5>
            <br>
            <h2>FrontEnd</h2>
                <h5><a href="./regional-politicies-acceptance">regional-politicies-acceptance</a></h5>
                <h5><a href="./eu-solidarity-funds">eu-solidarity-funds</a></h5>
                <h5><a href="./foods-prices-inflation">Foods Prices Inflation</a></h5>
            <br>
            <h2>Project description</h2>
                <h5>Our sources of information are aimed at analyzing the statistics of regional politicies acceptance,
                    european solidarity funds and foods prices inflation.</h5>
            <br>
            <h2>Repository</h2>
                    <h5><a href="https://github.com/gti-sos/SOS2324-18">gti-sos/SOS2324-18</a></h5>
            <br>
            <h2>URL</h2>
                    <h5><a href = http://sos2324-18.appspot.com>http://sos2324-18.appspot.com</a></h5>
            <br>
            <h2>Documentacion Postman</h2>
            <ul>
                <li><h5><a href = http://sos2324-18.appspot.com/api/v1/regional-politicies-acceptance/docs>http://sos2324-18.appspot.com/api/v1/regional-politicies-acceptance/docs</a></h5><h5>(developed by Carlos Beato Rioja)</h5></li>
                <li><h5><a href = http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/docs>http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/docs</a></h5><h5>(developed by Miguel Moreno Martín-Palomo)</h5></li>
                <li><h5><a href = http://sos2324-18.appspot.com/api/v1/foods-prices-inflation/docs>http://sos2324-18.appspot.com/api/v1/foods-prices-inflation/docs</a></h5><h5>(developed by José Joaquín Garrido Vargas)</h5></li>
            </ul>
          </CardText>
        </CardBody>
      </Card>
</Container>    