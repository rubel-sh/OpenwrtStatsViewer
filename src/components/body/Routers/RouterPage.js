import React, { Component } from "react";
import { Container } from "@mui/material";
import Clients from "./Clients";
import ModalGraph from "./Modal/ModalGraph";
import RouterGraph from "./Modal/RouterGraph";
import { connect } from "react-redux";
import Loading from "../Loading";
import PleaseSelectRouter from "./Modal/PleaseSelectRouter";
import { Router, AutoGraph } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import { formatBytes } from "../../../customMethods/customMethods";

const mapStateToProps = (props) => {
  return {
    sliderState: props.sliderSelectorState,
    routerUsageState: props.sliderSelectorState.routerUsageState,
  };
};
class Routers extends Component {
  constructor() {
    super();
    this.state = {
      selectedRouter: {},
      selectedClient: {},
      selectedRouterUsage: {},
      modalOpen: false,
      routerModalOpen: false,
    };
  }

  selectRouterHandler(router) {
    this.setState({
      ...this.state,
      selectedRouter: router,
    });
  }
  // Router Usage Handler : saving json here
  selectRouterUsageHandler(usage) {
    this.setState({
      ...this.state,
      selectedRouterUsage: usage,
      selectedClient: {},
      routerModalOpen: true,
    });
  }
  toggleRouterModalHandler = () => [
    this.setState({ routerModalOpen: !this.state.routerModalOpen }),
  ];
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
      selectedRouterUsage: {},
      modalOpen: false,
      routerModalOpen: false,
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
        if (router.router === this.props.routerUsageState[index].router) {
          const routerState = this.props.routerUsageState;
          const usageHistory = routerState[index].data.reduce(
            (acc, data) => {
              acc.tDownloads = acc.tDownloads + data.totaldownloads;
              acc.tUploads = acc.tUploads + data.totaluploads;
              return acc;
            },
            {
              tDownloads: 0,
              tUploads: 0,
            }
          );
          return (
            <ButtonGroup
              variant="contained"
              color="success"
              orientation="vertical"
              key={index}
            >
              <Button
                size="medium"
                startIcon={<Router />}
                variant="contained"
                sx={{
                  backgroundColor: "rgb(62, 177, 156)",
                  fontSize: {
                    xs: "1rem",
                    md: "1.115rem",
                  },
                  "&:hover": {
                    backgroundColor: "rgb(42, 163, 141)",
                  },
                }}
                className="router_child"
                onClick={() => {
                  this.selectRouterHandler(router);
                }}
              >
                {router.router}
              </Button>
              {/* This button for Router Usage */}
              <Button
                startIcon={<AutoGraph />}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "rgb(62, 177, 156)",
                  gap: "10",
                  fontSize: {
                    xs: "1rem",
                    md: "1.115rem",
                  },
                  "&:hover": {
                    backgroundColor: "rgb(42, 163, 141)",
                  },
                }}
                className="router_child"
                key={index}
                onClick={() => {
                  this.selectRouterUsageHandler(
                    this.props.routerUsageState[index]
                  );
                }}
              >
                DOWN: {formatBytes(usageHistory.tDownloads)} Up:{" "}
                {formatBytes(usageHistory.tUploads)}
              </Button>
            </ButtonGroup>
          );
        }
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
          <RouterGraph
            selectedRouterUsage={this.state.selectedRouterUsage}
            toggleRouterModalHandler={this.toggleRouterModalHandler.bind(this)}
            routerModalOpen={this.state.routerModalOpen}
          />
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps)(Routers);
