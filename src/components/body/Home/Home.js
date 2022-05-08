import React, { Component } from "react";
import Uptime from "./Uptime";
import LoadChart from "./LoadChart";
import MemChart from "./MemChart";
import Container from "@mui/material/Container";
import axios from "axios";
import moment from "moment";
import { ROUTER_STATS_API } from "../../../jsonAPI/jsonAPI";
import styles from "./myCss.module.css";
class Home extends Component {
  state = {
    upTime: "00",
    dates: ["00", "00", "00", "00", "00"],
    loadAverage: {
      oneMin: ["00", "00", "00", "00", "00"],
      fiveMin: ["00", "00", "00", "00", "00"],
    },
    memortUsage: {
      usedMemory: ["00", "00", "00", "00", "00"],
      freeMemory: ["00", "00", "00", "00", "00"],
      cachedMemory: ["00", "00", "00", "00", "00"],
    },
  };
  componentDidMount() {
    axios
      .get(ROUTER_STATS_API)
      .then((response) => {
        const result = response.data;
        // Latest Uptime
        const upTime = result.at(-1).upTime;
        // Dates Array
        let dates = result.reduce((acc, data) => [...acc, data.date], []);
        dates = dates.map((data) =>
          moment(new Date(data * 1000).toLocaleString()).fromNow()
        );
        // LoadAverage calculateData
        const oneMin = result.map((data) => data.load[0]);
        const fiveMin = result.map((data) => data.load[1]);
        // MemortUsage calculateData
        const usedMemory = result.map((data) => data.memory[1]);
        const freeMemory = result.map((data) => data.memory[2]);
        const cachedMemory = result.map((data) => data.memory[4]);
        // Updating State
        this.setState({
          ...this.state,
          upTime: upTime,
          dates: dates,
          loadAverage: { oneMin: oneMin, fiveMin: fiveMin },
          memortUsage: {
            usedMemory: usedMemory,
            freeMemory: freeMemory,
            cachedMemory: cachedMemory,
          },
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <Container
        // sx={{
        //   backgroundColor: "rgb(228, 250, 255,0.1)",
        //   backdropFilter: "blur(5px)",
        // }}
        className={styles.container}
      >
        <Uptime latestTime={this.state.upTime} />
        <hr />
        <div className={styles.chartContainer}>
          <LoadChart
            dates={this.state.dates}
            loadAverage={this.state.loadAverage}
          />
          <MemChart
            dates={this.state.dates}
            memortUsage={this.state.memortUsage}
          />
        </div>
        <hr />
      </Container>
    );
  }
}

export default Home;
