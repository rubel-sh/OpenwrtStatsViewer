import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap";
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false
    }
  }
  navToggle = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
  }
  render() {
    return (
      <div>
        <Navbar dark color="dark" expand="sm">
          <div className="container">
            <NavbarToggler onClick={this.navToggle} />
            <NavbarBrand href="/">OpenWRT Stats</NavbarBrand>
            <Collapse navbar isOpen={this.state.isNavOpen}>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink exact to="/home" className="nav-link">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/speed" className="nav-link">Speed</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/totalusage" className="nav-link">Total Usage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/clientlists" className="nav-link">Client Lists</NavLink>
                </NavItem>
              </Nav>
            </Collapse>

          </div>
        </Navbar>
      </div>
    )

  };
};

export default Navigation;
