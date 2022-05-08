import React from "react";
import { Line } from "react-chartjs-2";
import { options, dataset_settings, height } from "./chart_settings";
import styles from "./myCss.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LoadChart(props) {
  const data = {
    labels: props.dates,
    datasets: [
      {
        ...dataset_settings,
        label: "1 Min Avg",
        data: props.loadAverage.oneMin,
        backgroundColor: "#36AE7C",
        borderColor: "#36AE7C",
      },
      {
        ...dataset_settings,
        label: "5 Min Avg",
        data: props.loadAverage.fiveMin,
        backgroundColor: "#187498",
        borderColor: "#187498",
      },
    ],
  };
  let option = {
    ...options,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "CPU Load Average",
      },
    },
  };

  return (
    <div>
      <Line
        width={document.documentElement.clientWidth}
        height={height}
        data={data}
        options={option}
      />
    </div>
  );
}
