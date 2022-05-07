import React, { Component } from "react";
import Uptime from "./Uptime";
import LoadChart from "./LoadChart";
import MemChart from "./MemChart";
import Container from "@mui/material/Container";

class Home extends Component {
  render() {
    return (
      <Container
        sx={{
          backgroundColor: "rgb(228, 250, 255,0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Uptime />
        <LoadChart />
        <MemChart />
      </Container>
    );
  }
}

export default Home;
