import React, { Component } from "react";
import { Container } from "@mui/material";
import Clients from "./Clients";
import ModalGraph from "./Modal/ModalGraph";
import { connect } from "react-redux";
import Loading from "../Loading";
import PleaseSelectRouter from "./Modal/PleaseSelectRouter";
import { Router } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
const mapStateToProps = (props) => {
  return {
    sliderState: props.sliderSelectorState,
  };
};
class Routers extends Component {
  constructor() {
    super();
    this.state = {
      selectedRouter: {},
      selectedClient: {},
      modalOpen: false,
    };
  }

  selectRouterHandler(router) {
    this.setState({
      ...this.state,
      selectedRouter: router,
    });
  }
  // Passed to Client.js
  selectedClientHandler(client) {
    this.setState({
      ...this.state,
      selectedClient: client,
      modalOpen: true,
    });
  }

  toggleModalHandler = () => [
    this.setState({ modalOpen: !this.state.modalOpen }),
  ];

  clearRouterState = () => {
    this.setState({
      ...this.state,
      selectedRouter: {},
      selectedClient: {},
      modalOpen: false,
    });
  };

  render() {
    if (this.props.sliderState.isLoading) {
      return (
        <div
          onLoad={this.clearRouterState}
          className="totalUsage_parent_loading"
        >
          {Object.keys(this.state.selectedRouter).length === 0 ? (
            <h2 style={{ fontFamily: "Sen" }}>Please Select Days</h2>
          ) : (
            <div onLoad={this.clearRouterState()}>
              <Loading onLoad={() => this.clearRouterState} />
            </div>
          )}
        </div>
      );
    } else {
      // Returns Routers list
      const totalRouters = this.props.sliderState.state.map((router, index) => {
        const totalDownload = [];
        console.log(this.state.selectedRouter);
        router.users.map((user) => totalDownload.push(user.totaldownloads));
        return (
          <Button
            startIcon={
              <Router
                sx={{
                  fontSize: {
                    xs: "5rem",
                    md: "2rem",
                  },
                }}
              />
            }
            color="primary"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary.dark",
              gap: "10",
              fontSize: {
                xs: "1rem",
                md: "1.115rem",
              },
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
            className="router_child"
            key={index}
            onClick={() => {
              this.selectRouterHandler(router);
            }}
          >
            {router.router}
          </Button>
        );
      });
      return (
        <Container>
          {/* Render Routers */}
          <div>
            <div className="router_parent">{totalRouters}</div>
          </div>
          {/* Render Clients */}
          <div>
            {Object.keys(this.state.selectedRouter).length !== 0 ? (
              <Clients
                selectedRouter={this.state.selectedRouter}
                fetchSelectedClient={this.selectedClientHandler.bind(this)}
              />
            ) : (
              <PleaseSelectRouter />
            )}
          </div>
          {/* Render Graph */}
          <ModalGraph
            selectedClient={this.state.selectedClient}
            toggleModalHandler={this.toggleModalHandler.bind(this)}
            modalOpen={this.state.modalOpen}
          />
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps)(Routers);
