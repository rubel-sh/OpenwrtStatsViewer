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
  // Using momentJS
  const formatKB = (perm) => perm / 1024;
  const labels = props.selectedRouterUsage.data.map((data) =>
    moment(new Date(data.date * 1000).toISOString()).format("D/MM [-] LT")
  );
  const downData = props.selectedRouterUsage.data.map((data) =>
    parseInt(formatKB(data.downData))
  );
  const upData = props.selectedRouterUsage.data.map((data) =>
    parseInt(formatKB(data.upData))
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Download",
        data: downData,
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
        data: upData,
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
  const speedGraph = (
    <div className="router1">
      <Line
        width={document.documentElement.clientWidth}
        height={400}
        options={options}
        data={data}
      />
    </div>
  );
  return (
    <div>
      <h5 style={{ textAlign: "center" }}>Speed in KBps</h5>
      <hr />
      <div className="canvus-container">{speedGraph}</div>
    </div>
  );
};

export default SpeedChart;
