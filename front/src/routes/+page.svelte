<script lang="ts">
    import { Container,Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    Row, Col, Icon,
    CardTitle } from '@sveltestrap/sveltestrap';
</script>

<style>
    @import '/style.css';
</style>

<Container sm>
    <Card theme="auto">
        <CardHeader>
          <CardTitle><h3>SOS2324-18</h3></CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="person-circle" /> Team</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5><a href="https://github.com/carbeario">Carlos Beato Rioja</a></h5>
                <h5><a href="https://github.com/migmormar7">Miguel Moreno Martín-Palomo</a></h5>
                <h5><a href="https://github.com/JJoaquinGV19">José Joaquín Garrido Vargas</a></h5>
              </CardBody>
            </Card></Col>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="server" /> APIs</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5><a href="api/v2/regional-politicies-acceptance">api/v2/regional-politicies-acceptance</a></h5>
                <h5><a href="api/v1/eu-solidarity-funds">eu-solidarity-funds</a></h5>
                <h5><a href="api/v2/foods-prices-inflation">foods-prices-inflation</a></h5>
              </CardBody>
            </Card></Col>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="front" /> FrontEnds</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5><a href="./regional-politicies-acceptance">regional-politicies-acceptance</a></h5>
                <h5><a href="./eu-solidarity-funds">eu-solidarity-funds</a></h5>
                <h5><a href="./foods-prices-inflation">Foods Prices Inflation</a></h5>
              </CardBody>
            </Card></Col>
          </Row><br>
          <Row>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="info-square" /> Project description</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5>Our sources of information are aimed at analyzing the statistics of regional politicies acceptance,
                    european solidarity funds and foods prices inflation.</h5>
              </CardBody>
            </Card></Col>
          </Row><br>
          <Row>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="folder-check" /> Repository</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5><a href="https://github.com/gti-sos/SOS2324-18">gti-sos/SOS2324-18</a></h5>
              </CardBody>
            </Card></Col>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="link" /> URL</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <h5><a href = http://sos2324-18.appspot.com>http://sos2324-18.appspot.com</a></h5>
              </CardBody>
            </Card></Col>
          </Row><br>
          <Row>
            <Col><Card theme="auto">
              <CardHeader>
                <CardTitle><h2><Icon name="filetype-doc" /> Documentacion Postman</h2></CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col><Card theme="auto">
                    <CardHeader>
                      <CardTitle><h2><Icon name="1-square" /> V1</h2></CardTitle>
                    </CardHeader>
                    <CardBody>
                      <ul>
                        <li><h5><a href = https://documenter.getpostman.com/view/32973833/2sA2xnxpzk>http://sos2324-18.appspot.com/api/v1/regional-politicies-acceptance/docs</a></h5><h5>(developed by Carlos Beato Rioja)</h5></li>
                        <li><h5><a href = http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/docs>http://sos2324-18.appspot.com/api/v1/eu-solidarity-funds/docs</a></h5><h5>(developed by Miguel Moreno Martín-Palomo)</h5></li>
                        <li><h5><a href = https://documenter.getpostman.com/view/33015048/2sA2xh3t5u>http://sos2324-18.appspot.com/api/v1/foods-prices-inflation/docs</a></h5><h5>(developed by José Joaquín Garrido Vargas)</h5></li>
                      </ul>
                    </CardBody>
                  </Card></Col>
                  <Col><Card theme="auto">
                    <CardHeader>
                      <CardTitle><h2><Icon name="2-square" /> V2</h2></CardTitle>
                    </CardHeader>
                    <CardBody>
                      <ul>
                        <li><h5><a href = http://sos2324-18.appspot.com/api/v2/regional-politicies-acceptance/docs>http://sos2324-18.appspot.com/api/v2/regional-politicies-acceptance/docs</a></h5><h5>(developed by Carlos Beato Rioja)</h5></li>
                        <li><h5><a href = http://sos2324-18.appspot.com/api/v2/foods-prices-inflation/docs>http://sos2324-18.appspot.com/api/v2/foods-prices-inflation/docs</a></h5><h5>(developed by José Joaquín Garrido Vargas)</h5></li>
                      </ul>
                    </CardBody>
                  </Card></Col>
                </Row> 
              </CardBody>
            </Card></Col>
          </Row>  
        </CardBody>
      </Card>
</Container>    