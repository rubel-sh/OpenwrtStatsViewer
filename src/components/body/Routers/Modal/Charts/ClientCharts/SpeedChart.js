import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

const SpeedChart = (props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    padding: true,
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };
  options.plugins.title.text =
    "Client Speeds in KBps: " + props.selectedClient.user;
  const formatKB = (perm) => perm / 1024;
  const labels = props.selectedClient.date.map((data) =>
    moment(new Date(data * 1000).toISOString()).format("D/MM [-] LT")
  );
  const tDownData = props.selectedClient.downData.map((data) =>
    parseInt(formatKB(data))
  );
  const tUpData = props.selectedClient.upData.map((data) =>
    parseInt(formatKB(data))
  );
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Download",
        data: tDownData,
        lineTension: 0.2,
        borderColor: "#398AB9",
        pointRadius: 0,
        pointHoverRadius: 5,
        backgroundColor: "#398AB9",
        fill: false,
        borderWidth: 1.5,
      },
      {
        label: "Upload",
        data: tUpData,
        lineTension: 0.2,
        borderColor: "#F0A500",
        pointRadius: 0,
        pointHoverRadius: 5,
        backgroundColor: "#F0A500",
        fill: false,
        borderWidth: 1.5,
      },
    ],
  };
  const userGraph = (
    <div className="router1">
      <Line
        width={document.documentElement.clientWidth}
        height={400}
        options={options}
        data={data}
      />
      {/* <Bar
                width={document.documentElement.clientWidth}
                height={400}
                options={options}
                data={data}
            /> */}
    </div>
  );
  return (
    <div>
      <h3
        style={{
          marginTop: "10px",
          fontWeight: "300",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        {props.selectedClient.user} in KBps
      </h3>
      <hr />
      <div className="canvus-container">{userGraph}</div>
    </div>
  );
};

export default SpeedChart;
