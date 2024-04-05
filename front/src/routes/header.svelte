
<script>
    import {
    Nav,
    NavItem,
    NavLink,
    Navbar, NavbarBrand, Icon
  } from '@sveltestrap/sveltestrap';
</script>



  <Navbar color="light-subtle">
    <NavbarBrand href="/"><Icon name="house" /> SOS2324-18</NavbarBrand>
    <Nav tabs color="light">
        <NavItem active><NavLink href="/regional-politicies-acceptance">VOTOS</NavLink></NavItem>
        <NavItem active><NavLink href="/foods-prices-inflation">FOODS</NavLink></NavItem>
        <NavItem active><NavLink href="/eu-solidarity-funds">FUNDS</NavLink></NavItem>
    </Nav>
  </Navbar>