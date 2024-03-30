
<script>
    import {
    Nav,
    NavItem,
    NavLink,
    Navbar, NavbarBrand
  } from '@sveltestrap/sveltestrap';
</script>



  <Navbar color="light-subtle">
    <NavbarBrand href="/">SOS2324-18</NavbarBrand>
    <Nav tabs color="light">
        <NavItem active><NavLink href="/regional-politicies-acceptance">Votos</NavLink></NavItem>
        <NavItem active><NavLink href="/foods-prices-inflation">Foods</NavLink></NavItem>
        <NavItem active><NavLink href="/eu-solidarity-funds">Funds</NavLink></NavItem>
    </Nav>
  </Navbar>