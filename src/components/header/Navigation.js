import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavbarText,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import WholeUsage from "./wholeUsage";
import SliderDateSelector from "./SliderDateSelector";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
  }
  navToggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  };
  render() {
    return (
      <div>
        <Navbar dark color="dark" expand="lg">
          <div className="container-md">
            <NavbarBrand href="/OpenwrtStatsViewer">
              <img
                alt="Openwrt Logo"
                src="https://i.ibb.co/cDmBYxm/Screenshot-2022-04-19-023609-removebg-preview-1.png"
                style={{ maxWidth: "160px" }}
              />
            </NavbarBrand>
            <Collapse navbar isOpen={this.state.isNavOpen}>
              <Nav className="mr-auto align-middle" navbar>
                <NavItem>
                  <NavLink exact to="/" className="nav-link">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/router" className="nav-link">
                    Router
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/clientlists" className="nav-link">
                    Client Lists
                  </NavLink>
                </NavItem>
                <NavItem>
                  <SliderDateSelector />
                </NavItem>
              </Nav>
            </Collapse>
            <NavbarText>
              <WholeUsage />
            </NavbarText>
            <NavbarToggler onClick={this.navToggle} />
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
